import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStorageService } from '@core/services/auth.storage.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(-100%)'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ])
  ]
})
export class NavbarComponent {
  public isShow = false;
  public isMobile = window.innerWidth <= 768;

  constructor(
    private router: Router,
    private authStorageService: AuthStorageService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  public showNavbar(): void {
    this.isShow = !this.isShow;
  }

  public logout(): void {
    this.authStorageService.removeToken();
    this.router.navigate(['/auth/login']);
  }
}
