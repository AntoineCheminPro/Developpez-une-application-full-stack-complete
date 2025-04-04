import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NavigationService } from '../../core/services/navigation/navigation.service';
import { BehaviorSubject } from 'rxjs';
import { LogoComponent } from './logo/logo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BacklinkComponent } from './backlink/backlink.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navigationService: NavigationService;
  let showHeaderSubject: BehaviorSubject<boolean>;
  let showNavbarSubject: BehaviorSubject<boolean>;
  let showBacklinkSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    showHeaderSubject = new BehaviorSubject<boolean>(true);
    showNavbarSubject = new BehaviorSubject<boolean>(true);
    showBacklinkSubject = new BehaviorSubject<boolean>(false);
    
    await TestBed.configureTestingModule({
      declarations: [ 
        HeaderComponent,
        LogoComponent,
        NavbarComponent,
        BacklinkComponent
      ],
      providers: [
        {
          provide: NavigationService,
          useValue: {
            getShowHeader: () => showHeaderSubject.asObservable(),
            getShowNavbar: () => showNavbarSubject.asObservable(),
            getShowBacklink: () => showBacklinkSubject.asObservable()
          }
        }
      ]
    })
    .compileComponents();

    navigationService = TestBed.inject(NavigationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject NavigationService', () => {
    expect(component.navigationService).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.isAuthPage).toBeFalse();
    expect(component.isHomePage).toBeFalse();
    expect(component.showNavbar).toBeTrue();
  });

  it('should render header when showHeader is true', () => {
    showHeaderSubject.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')).toBeTruthy();
  });

  it('should not render header when showHeader is false', () => {
    showHeaderSubject.next(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')).toBeFalsy();
  });

  it('should render navbar when showNavbar is true', () => {
    showHeaderSubject.next(true);
    showNavbarSubject.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should not render navbar when showNavbar is false', () => {
    showHeaderSubject.next(true);
    showNavbarSubject.next(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeFalsy();
  });

  it('should render backlink when showBacklink is true', () => {
    showHeaderSubject.next(true);
    showBacklinkSubject.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-backlink')).toBeTruthy();
  });

  it('should not render backlink when showBacklink is false', () => {
    showHeaderSubject.next(true);
    showBacklinkSubject.next(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-backlink')).toBeFalsy();
  });

  it('should apply auth page class when isAuthPage is true', () => {
    component.isAuthPage = true;
    showHeaderSubject.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.header--auth')).toBeTruthy();
  });

  it('should apply home page class when isHomePage is true', () => {
    component.isHomePage = true;
    showHeaderSubject.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.header--home')).toBeTruthy();
  });
});
