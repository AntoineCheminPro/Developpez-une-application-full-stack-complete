import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { BacklinkComponent } from './backlink/backlink.component';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    BacklinkComponent,
    LogoComponent,
    NavbarComponent
  ],
  template: `
    <header class="header" [ngClass]="{'header--auth': isAuthPage, 'header--home': isHomePage}">
      <div class="header__container">
        <div class="header__logo-container">
          <app-logo class="header__logo"></app-logo>
        </div>
        <div class="header__nav-container">
          <app-backlink *ngIf="showBacklink" class="header__backlink"></app-backlink>
          <app-navbar *ngIf="showNavbar" class="header__navigation"></app-navbar>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isHomePage = false;
  @Input() isAuthPage = false;
  @Input() showNavbar = false;
  @Input() showBacklink = false;
}
