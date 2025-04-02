import {Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITopic} from "../../models/topics/topic.interface";
import {FetchService} from "../fetch.service";

export const TOPICS_SERVICE = new InjectionToken<TopicsService>('TOPICS_SERVICE');

@Injectable({
  providedIn: 'root',
  useClass: TopicsService
})
export class TopicsService extends FetchService {
  private pathService: string = '/api/topics';

  constructor(private http: HttpClient) {
    super(http);
  }

  public getAll(): Observable<ITopic[]> {
    return this.fetch<ITopic[]>(this.pathService);
  }

  public getSubscribed(): Observable<ITopic[]> {
    return this.fetch<ITopic[]>(`${this.pathService}/subscribed`);
  }

  public subscribeToTopic(topicId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/subscribe?topicId=${topicId}&subscribe=true`, null);
  }

  public unSubscribeToTopic(topicId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/subscribe?topicId=${topicId}&subscribe=false`, null);
  }
}
