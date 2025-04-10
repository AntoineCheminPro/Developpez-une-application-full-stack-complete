import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import {
  catchError,
  forkJoin,
  map,
  of,
  Subject,
  takeUntil,
  finalize,
  tap
} from "rxjs";
import { TopicsService } from "../../core/services/topics/topics.service";
import { CollectionSort } from "../../core/utils/collection.sort";
import { LoaderComponent } from '../../components/loader/loader.component';
import { TopicCardComponent } from './topic-card/topic-card.component';
import { Topic } from '../../core/models/topics/topic.interface';
import { TopicEvent } from "../../core/EventEmitters/topic-event.interface";
import { topicsProvider } from '@core/providers/topics.provider';

const ERROR_MESSAGES = {
  FETCH: 'Une erreur est survenue lors de la récupération des sujets',
  SUBSCRIBE: 'Erreur lors de la souscription au sujet'
} as const;

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    TopicCardComponent,
    LoaderComponent
  ],
  providers: [
    topicsProvider
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent implements OnInit, OnDestroy {
  private readonly topicsService: TopicsService = inject(TopicsService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroy$ = new Subject<void>();

  private _externalTopics?: Topic[];
  @Input() set externalTopics(value: Topic[] | undefined) {
    if (value) {
      this._externalTopics = value;
      this.topics = value;
      this.hasData = value.length > 0;
      this.cdr.markForCheck();
    }
  }
  get externalTopics(): Topic[] | undefined {
    return this._externalTopics;
  }

  @Input() externalIsLoading?: boolean;
  @Input() externalHasError?: boolean;
  @Input() isSubscribeMode: boolean = true;

  public topics: Topic[] = [];
  public hasData = false;
  public hasError = false;
  public isLoading = false;
  public error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.externalTopics) {
      this.topics = this.externalTopics;
      this.hasData = this.topics.length > 0;
      this.isLoading = this.externalIsLoading ?? false;
      this.hasError = this.externalHasError ?? false;
      return;
    }

    this.topicsService.getIsFetching()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isFetching => {
        this.isLoading = isFetching;
        this.cdr.markForCheck();
      });

    this.getTopics();
  }

  private getTopics(): void {
    forkJoin({
      allTopics: this.topicsService.getTopics(),
      subscribedTopics: this.topicsService.getSubscribedTopics()
    }).pipe(
      map(({ allTopics, subscribedTopics }) => {
        const subscribedIds = new Set(subscribedTopics.map(topic => topic.id));
        return allTopics.map(topic => ({
          ...topic,
          isSubscribed: subscribedIds.has(topic.id)
        }));
      }),
      catchError((error: Error) => {
        this.hasError = true;
        return of([]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(topics => {
      this.topics = CollectionSort.sortByCreationDateDescending(topics);
      this.hasData = this.topics.length > 0;
      this.cdr.markForCheck();
    });
  }

  public subscribeTopic(event: TopicEvent): void {
    if (this.isSubscribeMode) {
      this.topicsService.subscribe(event.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => this.getTopics());
    } else {
      this.topicsService.unsubscribe(event.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.topics = this.topics.filter(topic => topic.id !== event.id);
        this.hasData = this.topics.length > 0;
        this.cdr.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubscribe(event: { id: string }): void {
    this.topicsService.subscribe(event.id).subscribe({
      next: () => {
        this.topics = this.topics.map(topic => 
          topic.id === event.id ? { ...topic, subscribed: true } : topic
        );
      },
      error: (error) => {
        this.error = error;
      }
    });
  }

  onUnsubscribe(event: { id: string }): void {
    this.topicsService.unsubscribe(event.id).subscribe({
      next: () => {
        this.topics = this.topics.map(topic => 
          topic.id === event.id ? { ...topic, subscribed: false } : topic
        );
      },
      error: (error) => {
        this.error = error;
      }
    });
  }
}
