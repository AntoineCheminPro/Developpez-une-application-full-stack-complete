import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/home" class="logo">
      <img src="assets/logo.svg" alt="Logo MDD" class="logo__image">
    </a>
  `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {} 