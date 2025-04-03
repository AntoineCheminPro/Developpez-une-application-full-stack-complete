import { Component, Input } from '@angular/core';
import { NgClass, NgIf, AsyncPipe } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { BacklinkComponent } from './backlink/backlink.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    AsyncPipe,
    LogoComponent,
    NavbarComponent,
    BacklinkComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isAuthPage = false;
  @Input() isHomePage = false;
  @Input() showNavbar = true;

  constructor(public navigationService: NavigationService) {}
}
