import {Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {Topic} from "../../models/topics/topic.interface";
import {FetchService} from "../fetch.service";
import {environment} from "../../../../environments/environment";

export const TOPICS_SERVICE = new InjectionToken<TopicsService>('TOPICS_SERVICE');

@Injectable({
  providedIn: 'root',
  useClass: TopicsService
})
export class TopicsService extends FetchService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    super(http);
  }

  public getAll(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/topics`).pipe(
      map(topics => topics.map(topic => ({...topic, id: String(topic.id)})))
    );
  }

  public getSubscribed(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}/topics/subscribed`).pipe(
      map(topics => topics.map(topic => ({...topic, id: String(topic.id)})))
    );
  }

  public subscribeToTopic(topicId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/topics/${topicId}/subscribe`, {});
  }

  public unSubscribeToTopic(topicId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/topics/${topicId}/unsubscribe`);
  }
}
