import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly ROUTES_WITH_BACKLINK = [
    '/posts/',  // Pour les détails d'un post
    '/topics/', // Pour les détails d'un topic
    '/login',   // Pour la page de connexion
    '/register' // Pour la page d'inscription
  ];

  private readonly ROUTES_WITHOUT_NAVBAR = [
    '/login',
    '/register',
    '/'  // Page d'accueil
  ];

  private readonly ROUTES_WITHOUT_HEADER = [
    '/'
  ];

  private showBacklink$ = new BehaviorSubject<boolean>(false);
  private showNavbar$ = new BehaviorSubject<boolean>(true);
  private showHeader$ = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {
    this.initializeBacklink();
    this.initializeNavbar();
    this.initializeHeader();
  }

  private initializeBacklink(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showBacklink$.next(this.shouldShowBacklink(event.url));
      }
    });
  }

  private initializeNavbar(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar$.next(!this.shouldHideNavbar(event.url));
      }
    });
  }

  private initializeHeader(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader$.next(!this.shouldHideHeader(event.url));
      }
    });
  }

  private shouldShowBacklink(url: string): boolean {
    return this.ROUTES_WITH_BACKLINK.some(route => url.startsWith(route));
  }

  private shouldHideNavbar(url: string): boolean {
    return this.ROUTES_WITHOUT_NAVBAR.some(route => url === route);
  }

  private shouldHideHeader(url: string): boolean {
    return this.ROUTES_WITHOUT_HEADER.some(route => url === route);
  }

  getShowBacklink(): Observable<boolean> {
    return this.showBacklink$.asObservable();
  }

  getShowNavbar(): Observable<boolean> {
    return this.showNavbar$.asObservable();
  }

  getShowHeader(): Observable<boolean> {
    return this.showHeader$.asObservable();
  }
} 