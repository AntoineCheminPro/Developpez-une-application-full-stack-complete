import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SessionInformation } from '@core/models/auth/sessionInformation.interface';
import { LoginRequest } from '@core/payloads/auth/loginRequest.interface';
import { RegisterRequest } from '@core/payloads/auth/registerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthFakerService {
  private readonly FAKE_DELAY = 1000;

  public login(loginRequest: LoginRequest): Observable<SessionInformation> {
    const fakeResponse: SessionInformation = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake',
      username: loginRequest.email,
      isAuthenticated: true
    };

    return of(fakeResponse).pipe(
      delay(this.FAKE_DELAY)
    );
  }

  public register(registerRequest: RegisterRequest): Observable<void> {
    return of(void 0).pipe(
      delay(this.FAKE_DELAY)
    );
  }
} 