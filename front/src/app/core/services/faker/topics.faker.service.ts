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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      isSubscribed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Science',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isSubscribed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Cuisine',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      isSubscribed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Voyages',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
      isSubscribed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Sport',
      description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
      isSubscribed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Culture',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
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