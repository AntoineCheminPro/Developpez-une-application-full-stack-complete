import {Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {Topic} from "../../models/topics/topic.interface";
import {FetchService} from "../fetch.service";
import {environment} from "../../../../environments/environment";

export const TOPICS_SERVICE = new InjectionToken<TopicsService>('TOPICS_SERVICE');

const API_PATHS = {
  TOPICS: `${environment.apiUrl}/topics`,
  SUBSCRIBED: `${environment.apiUrl}/topics/subscribed`,
  SUBSCRIBE: (topicId: string) => `${environment.apiUrl}/topics/${topicId}/subscribe`,
  UNSUBSCRIBE: (topicId: string) => `${environment.apiUrl}/topics/${topicId}/unsubscribe`
} as const;

/**
 * Service gérant les opérations liées aux thèmes.
 * Permet de récupérer, s'abonner et se désabonner des thèmes.
 */
@Injectable({
  providedIn: 'root',
  useClass: TopicsService
})
export class TopicsService extends FetchService {
  constructor(private readonly http: HttpClient) {
    super(http);
  }

  public getTopics(): Observable<Topic[]> {
    return this.fetch<Topic[]>(API_PATHS.TOPICS).pipe(
      map(topics => topics.map(topic => ({...topic, id: String(topic.id)})))
    );
  }

  public getSubscribedTopics(): Observable<Topic[]> {
    return this.fetch<Topic[]>(API_PATHS.SUBSCRIBED).pipe(
      map(topics => topics.map(topic => ({...topic, id: String(topic.id)})))
    );
  }

  public subscribe(topicId: string): Observable<void> {
    return this.http.post<void>(API_PATHS.SUBSCRIBE(String(parseInt(topicId, 10))), {});
  }

  public unsubscribe(topicId: string): Observable<void> {
    return this.http.delete<void>(API_PATHS.UNSUBSCRIBE(String(parseInt(topicId, 10))));
  }
}
