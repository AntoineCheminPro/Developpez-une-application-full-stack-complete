import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly ROUTES_WITH_BACKLINK = [
    '/posts',  // Pour les détails d'un post
    '/login',   // Pour la page de connexion
    '/register' // Pour la page d'inscription
  ];

  private readonly ROUTES_WITHOUT_NAVBAR = [
    '/login',
    '/register',
    '/home'  // Page d'accueil
  ];

  private readonly ROUTES_WITHOUT_HEADER = [
    '/home'  // Page d'accueil
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
        console.log('🚀 URL actuelle:', event.url);
        const shouldShow = this.shouldShowBacklink(event.url);
        console.log('🚀 Devrait montrer le backlink ?', shouldShow);
        this.showBacklink$.next(shouldShow);
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
    console.log('🚀 Routes avec backlink:', this.ROUTES_WITH_BACKLINK);
    const result = this.ROUTES_WITH_BACKLINK.some(route => 
      url === route || url.startsWith(`${route}/`)
    );
    console.log('🚀 URL commence par une route avec backlink ?', result);
    return result;
  }

  private shouldHideNavbar(url: string): boolean {
    return this.ROUTES_WITHOUT_NAVBAR.some(route => url === route);
  }

  private shouldHideHeader(url: string): boolean {
    const shouldHide = this.ROUTES_WITHOUT_HEADER.some(route => url === route);
    return shouldHide;
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