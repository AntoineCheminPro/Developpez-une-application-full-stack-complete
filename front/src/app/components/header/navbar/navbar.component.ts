import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStorageService } from '@core/services/auth.storage.service';
import { CommonModule } from '@angular/common';
import { navbarAnimations } from './navbar.animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  animations: [navbarAnimations]
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
