import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../../payloads/auth/loginRequest.interface';
import { RegisterRequest } from '../../payloads/auth/registerRequest.interface';
import { SessionInformation } from "../../models/auth/sessionInformation.interface";
import { environment } from '../../../../environments/environment';
import { AuthStorageService } from '../auth.storage.service';

const API_PATHS = {
  AUTH_BASE: `${environment.apiUrl}/auth`,
  REGISTER: `${environment.apiUrl}/auth/register`,
  LOGIN: `${environment.apiUrl}/auth/login`
} as const;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authStorageService: AuthStorageService
  ) {}

  public createUser(registerRequest: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(API_PATHS.REGISTER, registerRequest);
  }

  public authenticate(loginRequest: LoginRequest): Observable<SessionInformation> {
    return this.httpClient.post<SessionInformation>(API_PATHS.LOGIN, loginRequest).pipe(
      tap((session) => {
        if (session.token && typeof session.token === 'string') {
          this.authStorageService.setToken(session.token);
        }
      })
    );
  }
}
