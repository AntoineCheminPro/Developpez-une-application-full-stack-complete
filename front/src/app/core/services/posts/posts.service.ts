import { HttpHeaders } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from "@core/models/posts/post.interface";
import { Comment } from "@core/models/posts/comment.interface";
import { IPostRequest } from "@core/payloads/posts/post.request.interface";
import { FetchService } from "@core/services/fetch.service";
import { HttpClient } from '@angular/common/http';

export const POSTS_SERVICE = new InjectionToken<PostsService>('POSTS_SERVICE');

const API_PATHS = {
  POSTS: '/api/posts',
  FEED: '/api/posts/feed',
  COMMENTS: '/api/posts/:id/comments'
} as const;

@Injectable({
  providedIn: 'root',
  useClass: PostsService
})
export class PostsService extends FetchService {
  private readonly pathService: string = API_PATHS.POSTS;

  constructor(private readonly http: HttpClient) {
    super(http);
  }

  public getFeed(): Observable<Post[]> {
    return this.fetch<Post[]>(API_PATHS.FEED);
  }

  public getAllComments(id: string): Observable<Comment[]> {
    return this.fetch<Comment[]>(API_PATHS.COMMENTS.replace(':id', id));
  }

  public savePost(topicId: string, postRequest: IPostRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}?topicId=${topicId}`, postRequest);
  }

  public saveComment(id: string, commentStr: string): Observable<void> {
    const comment = { comment: commentStr };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<void>(
      API_PATHS.COMMENTS.replace(':id', id),
      JSON.stringify(comment),
      { headers }
    );
  }

  public createPost(postRequest: IPostRequest): Observable<void> {
    return this.http.post<void>(this.pathService, postRequest);
  }
}
