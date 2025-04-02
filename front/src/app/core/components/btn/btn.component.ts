import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export type BtnType = 'submit' | 'cta' | 'none';
export type BtnVerticalPosition = 'top' | 'center' | 'bottom';
export type BtnHorizontalPosition = 'left' | 'center' | 'right';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnComponent {
  @Input({ required: true }) text!: string;
  @Input() type: BtnType = 'none';
  @Input() verticalPosition: BtnVerticalPosition = 'center';
  @Input() horizontalPosition: BtnHorizontalPosition = 'center';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() ariaLabel?: string;
  @Input() iconSrc?: string;
  @Input() showIcon = false;
  @Input() routerLink?: string;

  @Output() btnClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClick(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    if (this.routerLink) {
      event.preventDefault();
      this.router.navigate([this.routerLink]);
    }

    this.btnClick.emit();
  }
} 