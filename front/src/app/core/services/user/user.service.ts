import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "../../models/user/user.interface";
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly pathService = `${environment.apiUrl}/user`;

  constructor(private httpClient: HttpClient) { }

  public getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(this.pathService);
  }

  public updateUser(user: Partial<User>): Observable<User> {
    return this.httpClient.patch<User>(this.pathService, user);
  }
}
