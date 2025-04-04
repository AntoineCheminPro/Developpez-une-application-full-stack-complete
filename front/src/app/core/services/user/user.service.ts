import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "../../models/user/user.interface";
import { environment } from '../../../../environments/environment';

const API_PATHS = {
  USER: `${environment.apiUrl}/user`
} as const;

/**
 * Service gérant les opérations liées à l'utilisateur.
 * Permet de récupérer et mettre à jour les informations de l'utilisateur.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) { }

  public getUser(): Observable<User> {
    return this.httpClient.get<User>(API_PATHS.USER);
  }

  public update(user: Partial<User>): Observable<User> {
    return this.httpClient.patch<User>(API_PATHS.USER, user);
  }
}
