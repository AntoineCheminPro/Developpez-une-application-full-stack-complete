import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { Topic } from '@core/models/topics/topic.interface';
import { FetchService } from '../fetch.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicsFakerService extends FetchService {
  private readonly FAKE_DELAY = 1000;
  protected override isFetchingData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly topics: Topic[] = [
    {
      id: '1',
      title: 'Technologie',
      description: 'Actualités et innovations technologiques',
      isSubscribed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Science',
      description: 'Découvertes scientifiques et recherches',
      isSubscribed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Cuisine',
      description: 'Recettes et arts culinaires',
      isSubscribed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Voyages',
      description: 'Destinations et conseils de voyage',
      isSubscribed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Sport',
      description: 'Actualités sportives et entraînement',
      isSubscribed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Culture',
      description: 'Art, littérature et divertissement',
      isSubscribed: false,
      createdAt: new Date().toISOString()
    }
  ];

  constructor(http: HttpClient) {
    super(http);
  }

  public getTopics(): Observable<Topic[]> {
    this.isFetchingData$.next(true);
    return of(this.topics).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public getSubscribedTopics(): Observable<Topic[]> {
    this.isFetchingData$.next(true);
    return of(this.topics.filter(topic => topic.isSubscribed)).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public subscribe(topicId: string): Observable<void> {
    this.isFetchingData$.next(true);
    const topic = this.topics.find(t => t.id === topicId);
    if (topic) {
      topic.isSubscribed = true;
    }
    return of(void 0).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public unsubscribe(topicId: string): Observable<void> {
    this.isFetchingData$.next(true);
    const topic = this.topics.find(t => t.id === topicId);
    if (topic) {
      topic.isSubscribed = false;
    }
    return of(void 0).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public override getIsFetching(): Observable<boolean> {
    return this.isFetchingData$.asObservable();
  }
} 