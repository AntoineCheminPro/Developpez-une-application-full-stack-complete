import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type LoaderSize = 'default' | 'small' | 'large';
type LoaderColor = 'primary' | 'secondary' | 'accent';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() public size: LoaderSize = 'default';
  @Input() public color: LoaderColor = 'primary';
  @Input() public text: string = 'Chargement...';
  @Input() public showText: boolean = true;
  @Input() public fullScreen: boolean = false;

  protected readonly loaderClasses = computed(() => {
    const classes = ['loader'];
    
    if (this.size !== 'default') {
      classes.push(`loader--${this.size}`);
    }
    
    if (this.color !== 'primary') {
      classes.push(`loader--${this.color}`);
    }
    
    return classes;
  });

  protected readonly containerClasses = computed(() => {
    const classes = ['loader-container'];
    
    if (this.fullScreen) {
      classes.push('loader-container--fullscreen');
    }
    
    return classes;
  });
}
