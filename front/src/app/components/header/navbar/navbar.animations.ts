import { trigger, state, style, transition, animate } from '@angular/animations';

export const navbarAnimations = [
  trigger('navbarSlideInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    state('out', style({ transform: 'translateX(100%)' })),
    transition('in => out', animate('200ms ease-in-out')),
    transition('out => in', animate('200ms ease-in-out'))
  ])
]; 