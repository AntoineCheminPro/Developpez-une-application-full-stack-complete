import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<any>(null);

  constructor() {}

  public isLogged(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  public getCurrentUser(): Observable<string> {
    return this.user$.asObservable();
  }

  public setUser(user: any): void {
    this.user$.next(user);
    this.isLoggedIn$.next(true);
  }

  public clear(): void {
    this.user$.next(null);
    this.isLoggedIn$.next(false);
  }
} 