import { HttpHeaders } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Post } from "@core/models/posts/post.interface";
import { Comment } from "@core/models/posts/comment.interface";
import { IPostRequest } from "@core/payloads/posts/post.request.interface";
import { FetchService } from "@core/services/fetch.service";
import { HttpClient } from '@angular/common/http';

export const POSTS_SERVICE = new InjectionToken<PostsService>('POSTS_SERVICE');

const API_PATHS = {
  POSTS_BASE: '/api/posts',
  POSTS_FEED: '/api/posts/feed',
  POST_COMMENTS: '/api/posts/:id/comments'
} as const;

@Injectable({
  providedIn: 'root',
  useClass: PostsService
})
export class PostsService extends FetchService {
  private readonly basePath: string = API_PATHS.POSTS_BASE;

  constructor(private readonly http: HttpClient) {
    super(http);
  }

  public getFeed(): Observable<Post[]> {
    return this.fetch<Post[]>(API_PATHS.POSTS_FEED);
  }

  public getComments(postId: string): Observable<Comment[]> {
    return this.fetch<Comment[]>(API_PATHS.POST_COMMENTS.replace(':id', postId));
  }

  public createPostInTopic(postTopicId: string, postRequest: IPostRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.basePath}?topicId=${postTopicId}`, postRequest);
  }

  public createComment(postId: string, commentText: string): Observable<void> {
    const comment = { comment: commentText };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<void>(
      API_PATHS.POST_COMMENTS.replace(':id', postId),
      JSON.stringify(comment),
      { headers }
    );
  }

  public createPost(postRequest: IPostRequest): Observable<void> {
    return this.http.post<void>(this.basePath, postRequest);
  }
}
