import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationService } from './core/services/navigation/navigation.service';
import { AuthStorageService } from './core/services/auth.storage.service';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let navigationService: NavigationService;
  let showHeaderSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    showHeaderSubject = new BehaviorSubject<boolean>(true);
    
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        {
          provide: NavigationService,
          useValue: {
            getShowHeader: () => showHeaderSubject.asObservable()
          }
        },
        AuthStorageService
      ]
    }).compileComponents();

    navigationService = TestBed.inject(NavigationService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should inject NavigationService', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.navigationService).toBeTruthy();
  });

  it('should render header when showHeader is true', () => {
    showHeaderSubject.next(true);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should not render header when showHeader is false', () => {
    showHeaderSubject.next(false);
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeFalsy();
  });
});
