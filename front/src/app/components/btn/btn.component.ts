import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type BtnType = 'submit' | 'cta' | 'none';
type BtnVerticalPosition = 'top' | 'center' | 'bottom';
type BtnHorizontalPosition = 'left' | 'center' | 'right';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnComponent {
  @Input({ required: true }) public text!: string;
  @Input() public type: BtnType = 'none';
  @Input() public verticalPosition: BtnVerticalPosition = 'center';
  @Input() public horizontalPosition: BtnHorizontalPosition = 'center';
  @Input() public disabled = false;
  @Input() public loading = false;
  @Input() public ariaLabel?: string;
  @Input() public iconSrc?: string;
  @Input() public showIcon = false;
  @Input() public routerLink?: string;

  @Output() public btnClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  protected readonly btnClasses = computed(() => {
    const classes = ['btn'];
    
    // Type
    if (this.type !== 'none') {
      classes.push(`btn--${this.type}`);
    }
    
    // États
    if (this.disabled) {
      classes.push('btn--disabled');
    }
    if (this.loading) {
      classes.push('btn--loading');
    }
    
    // Positions
    if (this.verticalPosition !== 'center') {
      classes.push(`btn--vertical-${this.verticalPosition}`);
    }
    if (this.horizontalPosition !== 'center') {
      classes.push(`btn--horizontal-${this.horizontalPosition}`);
    }
    
    return classes;
  });

  protected onClick(event: Event): void {
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