import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backlink',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="backlink" 
      (click)="goBack()"
      aria-label="Retour à la page précédente"
    >
      <img 
        src="/assets/Arrow 20.svg" 
        alt=""
        class="backlink__icon"
        aria-hidden="true"
      >
    </button>
  `,
  styleUrls: ['./backlink.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BacklinkComponent {
  constructor(private router: Router) {}

  goBack(): void {
    window.history.back();
  }
} 