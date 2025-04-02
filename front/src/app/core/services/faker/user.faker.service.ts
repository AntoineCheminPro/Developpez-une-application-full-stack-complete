import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '@core/models/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserFakerService {
  private readonly FAKE_DELAY = 1000;

  private readonly currentUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    createdAt: new Date().toISOString(),
    subscribedTopics: ['1', '3', '5']
  };

  public getCurrentUser(): Observable<User> {
    return of(this.currentUser).pipe(
      delay(this.FAKE_DELAY)
    );
  }

  public updateUser(user: Partial<User>): Observable<User> {
    Object.assign(this.currentUser, user);
    return of(this.currentUser).pipe(
      delay(this.FAKE_DELAY)
    );
  }
} 