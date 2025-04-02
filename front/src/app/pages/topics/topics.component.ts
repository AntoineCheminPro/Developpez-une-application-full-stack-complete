import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  catchError,
  forkJoin,
  map,
  of,
  Subject,
  takeUntil,
  finalize
} from "rxjs";
import { TopicsService } from "../../core/services/topics/topics.service";
import { CollectionSort } from "../../core/utils/collection.sort";
import { MatButton } from "@angular/material/button";
import { LoaderComponent } from '../../components/loader/loader.component';
import { TopicCardComponent } from '../../components/topics/topic-card/topic-card.component';
import { Topic } from '../../core/models/topics/topic.interface';
import { TopicEvent } from "../../core/EventEmitters/topic-event.interface";

const ERROR_MESSAGES = {
  FETCH: 'Une erreur est survenue lors de la récupération des sujets',
  SUBSCRIBE: 'Erreur lors de la souscription au sujet'
} as const;

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    MatButton,
    TopicCardComponent,
    LoaderComponent
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent implements OnInit, OnDestroy {
  private readonly topicsService: TopicsService = inject(TopicsService);
  private readonly destroy$ = new Subject<void>();

  public topics: Topic[] = [];
  public hasData = false;
  public hasError = false;
  public isLoading = false;

  ngOnInit(): void {
    this.getTopics();
  }

  private getTopics(): void {
    this.isLoading = true;
    this.topicsService.isFetching.subscribe(isFetching => {
      this.isLoading = isFetching;
    });

    forkJoin({
      allTopics: this.topicsService.getAll(),
      subscribedTopics: this.topicsService.getSubscribed()
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
        console.error(ERROR_MESSAGES.FETCH, error);
        return of([]);
      }),
      finalize(() => this.isLoading = false),
      takeUntil(this.destroy$)
    ).subscribe(topics => {
      this.topics = CollectionSort.sortByCreationDateDescending(topics);
      this.hasData = this.topics.length > 0;
    });
  }

  public subscribeTopic(event: TopicEvent): void {
    this.isLoading = true;
    this.topicsService.subscribeToTopic(event.id).pipe(
      finalize(() => this.isLoading = false),
      catchError((error: Error) => {
        console.error(ERROR_MESSAGES.SUBSCRIBE, error);
        return of(null);
      })
    ).subscribe(() => this.getTopics());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
