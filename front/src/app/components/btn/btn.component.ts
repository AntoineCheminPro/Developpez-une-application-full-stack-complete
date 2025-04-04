import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, computed, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type BtnType = 'submit' | 'submit-cta' | 'cta' | 'none';
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
export class BtnComponent implements OnInit, OnChanges {
  @Input({ required: false }) public text?: string;
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

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] || changes['loading']) {
      this.changeDetectorRef.markForCheck();
      
      const buttonElement = document.querySelector('app-btn button') as HTMLButtonElement;
      if (buttonElement) {
        // Gérer l'état disabled
        if (changes['disabled']) {
          if (!this.disabled) {
            buttonElement.classList.remove('btn--disabled');
          }
        }
        
        // Gérer l'état loading
        if (changes['loading']) {
          if (!this.loading) {
            buttonElement.classList.remove('btn--disabled');
          }
        }
      }
    }
  }

  ngOnInit(): void {
    // Forcer la détection des changements au démarrage
    this.changeDetectorRef.markForCheck();
  }

  protected readonly btnClasses = computed(() => {
    const classes = ['btn'];
    
    // Type
    classes.push(`btn--${this.type}`);
    
    // États
    if (this.disabled || this.loading) {
      classes.push('btn--disabled');
    } else {
      // Retirer explicitement la classe si le bouton n'est plus désactivé
      classes.push('btn--enabled');
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
    
    return classes.join(' ');
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