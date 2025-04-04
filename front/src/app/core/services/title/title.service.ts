import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private title$ = new BehaviorSubject<string>('');

  setTitle(title: string): void {
    this.title$.next(title);
  }

  getTitle(): Observable<string> {
    return this.title$.asObservable();
  }
} 