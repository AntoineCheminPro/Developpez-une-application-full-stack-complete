import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) date!: string;
  @Input({ required: true }) author!: string;
  @Input({ required: true }) description!: string;
  @Input() id?: string;
}
