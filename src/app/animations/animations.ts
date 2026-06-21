import { trigger, transition, style, animate, query, stagger, keyframes, state, animateChild, group } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('600ms ease-out', style({ opacity: 1 })),
  ]),
]);

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate('700ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ], { params: { delay: 0 } }),
]);

export const fadeInLeft = trigger('fadeInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-40px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(40px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);

export const staggerList = trigger('staggerList', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(80, [
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ], { optional: true }),
  ]),
]);

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 })),
  ]),
]);

export const overlayFade = trigger('overlayFade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0 })),
  ]),
]);

export const cardHover = trigger('cardHover', [
  state('normal', style({ transform: 'translateY(0)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' })),
  state('hovered', style({ transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' })),
  transition('normal <=> hovered', animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
]);

export const pulse = trigger('pulse', [
  transition('* => *', [
    animate('800ms ease-in-out', keyframes([
      style({ transform: 'scale(1)', offset: 0 }),
      style({ transform: 'scale(1.05)', offset: 0.5 }),
      style({ transform: 'scale(1)', offset: 1 }),
    ])),
  ]),
]);

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%', opacity: 0 }), { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
    ], { optional: true }),
  ]),
]);

export const countAnimation = trigger('countAnimation', [
  transition(':increment', [
    animate('300ms ease-out', keyframes([
      style({ transform: 'scale(1.4)', offset: 0 }),
      style({ transform: 'scale(1)', offset: 1 }),
    ])),
  ]),
]);