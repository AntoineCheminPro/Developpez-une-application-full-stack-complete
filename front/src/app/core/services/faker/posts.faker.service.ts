import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { Post } from '@core/models/posts/post.interface';
import { Comment } from '@core/models/posts/comment.interface';
import { IPostRequest } from '@core/payloads/posts/post.request.interface';
import { FetchService } from '../fetch.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsFakerService extends FetchService {
  private readonly FAKE_DELAY = 1000;
  protected override isFetchingData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(http: HttpClient) {
    super(http);
  }

  public getFeed(): Observable<Post[]> {
    this.isFetchingData$.next(true);
    const today = new Date();
    const dates = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date;
    });

    const topics = [
      { id: '1', name: 'Technologie' },
      { id: '2', name: 'Science' },
      { id: '3', name: 'Cuisine' }
    ];

    const authors = [
      'John Doe',
      'Jane Smith',
      'Alice Johnson',
      'Bob Wilson'
    ];

    const fakePosts: Post[] = [
      {
        id: '1',
        topicId: topics[0].id,
        topicName: topics[0].name,
        title: 'Les dernières avancées en IA',
        description: 'Découvrez comment l\'intelligence artificielle transforme notre quotidien',
        author: authors[0],
        createdAt: dates[0].toISOString()
      },
      {
        id: '2',
        topicId: topics[1].id,
        topicName: topics[1].name,
        title: 'Exploration spatiale en 2024',
        description: 'Les missions spatiales qui vont marquer cette année',
        author: authors[1],
        createdAt: dates[1].toISOString()
      },
      {
        id: '3',
        topicId: topics[2].id,
        topicName: topics[2].name,
        title: 'Cuisine végétarienne moderne',
        description: 'Nouvelles tendances dans la cuisine végétarienne',
        author: authors[2],
        createdAt: dates[2].toISOString()
      },
      {
        id: '4',
        topicId: topics[0].id,
        topicName: topics[0].name,
        title: 'Le futur de la réalité virtuelle',
        description: 'Comment la VR va révolutionner notre façon de travailler',
        author: authors[3],
        createdAt: dates[3].toISOString()
      },
      {
        id: '5',
        topicId: topics[1].id,
        topicName: topics[1].name,
        title: 'Découvertes en biologie marine',
        description: 'Les nouvelles espèces découvertes dans les abysses',
        author: authors[0],
        createdAt: dates[4].toISOString()
      },
      {
        id: '6',
        topicId: topics[2].id,
        topicName: topics[2].name,
        title: 'Cuisine fusion asiatique',
        description: 'Mélanger les saveurs d\'Asie dans vos plats',
        author: authors[1],
        createdAt: dates[5].toISOString()
      }
    ];

    return of(fakePosts).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public getComments(postId: string): Observable<Comment[]> {
    this.isFetchingData$.next(true);
    const fakeComments: Comment[] = [
      {
        id: '1',
        username: 'John Doe',
        text: 'Très intéressant !',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        username: 'Jane Smith',
        text: 'Je suis d\'accord avec vous.',
        createdAt: new Date().toISOString()
      }
    ];

    return of(fakeComments).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public createPostInTopic(postTopicId: string, postRequest: IPostRequest): Observable<void> {
    this.isFetchingData$.next(true);
    return of(void 0).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public createComment(postId: string, commentText: string): Observable<void> {
    this.isFetchingData$.next(true);
    return of(void 0).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public override getIsFetching(): Observable<boolean> {
    return this.isFetchingData$.asObservable();
  }
} 