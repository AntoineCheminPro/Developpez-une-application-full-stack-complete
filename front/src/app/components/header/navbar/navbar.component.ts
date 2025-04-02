import {Component, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
    animations: [
      trigger('slideInOut', [
        state('in', style({
          transform: 'translate3d(0, 0, 0)'
        })),
        state('out', style({
          transform: 'translate3d(100%, 0, 0)'
        })),
        transition('in => out', animate('400ms ease-in-out')),
        transition('out => in', animate('400ms ease-in-out'))
      ]),
    ]
  
  
})
export class NavbarComponent {

  isShow = false;
  isMobile = window.innerWidth < 768;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  showNavbar(): void {
    this.isShow = !this.isShow;
  }

}
