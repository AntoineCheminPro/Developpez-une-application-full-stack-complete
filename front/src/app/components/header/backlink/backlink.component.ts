import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TitleService } from '@core/services/title/title.service';

@Component({
  selector: 'app-backlink',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backlink.component.html',
  styleUrls: ['./backlink.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BacklinkComponent {
  private router = inject(Router);
  private titleService = inject(TitleService);
  
  protected title$ = this.titleService.getTitle();

  goBack(): void {
    window.history.back();
  }
} 