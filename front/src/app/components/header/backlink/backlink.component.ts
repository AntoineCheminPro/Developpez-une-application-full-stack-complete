import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-backlink',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="backlink">
      <span class="backlink__arrow">←</span>
    </a>
  `,
  styleUrls: ['./backlink.component.scss']
})
export class BacklinkComponent {} 