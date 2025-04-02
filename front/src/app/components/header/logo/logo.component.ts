import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <div class="logo">
      <img src="assets/logo_p6.png" alt="Logo MDD" class="logo__image">
    </div>
  `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {} 