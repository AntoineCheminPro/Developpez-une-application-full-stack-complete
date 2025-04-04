import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SessionInformation } from '@core/models/auth/sessionInformation.interface';
import { LoginRequest } from '@core/payloads/auth/loginRequest.interface';
import { RegisterRequest } from '@core/payloads/auth/registerRequest.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthFakerService {
  private readonly FAKE_DELAY = 1000;

  constructor() {
    console.log('🎭 AuthFakerService initialized with useFaker:', environment.useFaker);
  }

  public authenticate(loginRequest: LoginRequest): Observable<SessionInformation> {
    console.log('🎭 AuthFakerService.authenticate called with:', loginRequest);
    const fakeResponse: SessionInformation = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake',
      username: loginRequest.email,
      isAuthenticated: true
    };

    return of(fakeResponse).pipe(
      delay(this.FAKE_DELAY)
    );
  }

  public createUser(registerRequest: RegisterRequest): Observable<void> {
    return of(void 0).pipe(
      delay(this.FAKE_DELAY)
    );
  }
} 