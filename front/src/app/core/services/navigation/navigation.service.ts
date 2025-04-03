import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly AUTH_ROUTES = [
    '/login',
    '/register'
  ];

  private readonly ROUTES_WITH_BACKLINK = [
    '/posts',
    ...this.AUTH_ROUTES
  ];

  private readonly ROUTES_WITHOUT_NAVBAR = [
    ...this.AUTH_ROUTES
  ];

  private readonly ROUTES_WITHOUT_HEADER = [
    '/home'
  ];

  private readonly MOBILE_ROUTES_WITHOUT_HEADER = [
    ...this.AUTH_ROUTES
  ];

  private showBacklink$ = new BehaviorSubject<boolean>(false);
  private showNavbar$ = new BehaviorSubject<boolean>(true);
  private showHeader$ = new BehaviorSubject<boolean>(true);
  private isMobile = false;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.initializeBacklink();
    this.initializeNavbar();
    this.initializeHeader();
    this.observeBreakpoints();
  }

  private observeBreakpoints(): void {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      this.isMobile = result.matches;
      this.updateHeader();
    });
  }

  private updateHeader(): void {
    if (this.router.url) {
      this.showHeader$.next(!this.shouldHideHeader(this.router.url));
    }
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
    const isRouteWithoutHeader = this.ROUTES_WITHOUT_HEADER.some(route => url === route);
    const isMobileRouteWithoutHeader = this.isMobile && this.MOBILE_ROUTES_WITHOUT_HEADER.some(route => url === route);
    return isRouteWithoutHeader || isMobileRouteWithoutHeader;
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