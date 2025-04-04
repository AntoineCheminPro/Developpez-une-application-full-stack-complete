import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { SessionService } from '@core/services/auth/auth.session.service';
import { LoggingService } from '@core/services/logging/logging.service';
import { AuthStorageService } from '@core/services/auth.storage.service';
import { BtnComponent } from '@app/components/btn/btn.component';
import { AuthComponent } from '../auth.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { of, throwError } from 'rxjs';
import { ERROR_MESSAGES } from '@core/constants/error-messages';
import { VALIDATION_PATTERNS } from '@core/constants/validation-patterns';
import { authProvider } from '@core/providers/auth.provider';
import { sessionProvider } from '@core/providers/session.provider';
import { storageProvider } from '@core/providers/storage.provider';
import { SessionInformation } from '@core/models/auth/sessionInformation.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let loggingServiceSpy: jasmine.SpyObj<LoggingService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['authenticate']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    sessionServiceSpy = jasmine.createSpyObj('SessionService', ['authenticate']);
    loggingServiceSpy = jasmine.createSpyObj('LoggingService', ['logError']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        LoginComponent,
        BtnComponent,
        AuthComponent
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: SessionService, useValue: sessionServiceSpy },
        { provide: LoggingService, useValue: loggingServiceSpy },
        AuthStorageService,
        authProvider,
        sessionProvider,
        storageProvider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.onError).toBeFalse();
    expect(component.isLoading).toBeFalse();
    expect(component.form).toBeDefined();
  });

  it('should have constants defined', () => {
    expect(component.ERROR_MESSAGES).toBe(ERROR_MESSAGES);
    expect(component.VALIDATION_PATTERNS).toBe(VALIDATION_PATTERNS);
  });

  it('should initialize form with empty values', () => {
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
  });

  it('should have email validation', () => {
    const emailControl = component.form.get('email');
    expect(emailControl?.hasValidator(Validators.pattern(VALIDATION_PATTERNS.EMAIL))).toBeTrue();
  });

  it('should have password validation', () => {
    const passwordControl = component.form.get('password');
    expect(passwordControl?.hasValidator(Validators.required)).toBeTrue();
  });

  it('should not submit if form is invalid', () => {
    component.submit();
    expect(authServiceSpy.authenticate).not.toHaveBeenCalled();
  });

  it('should not submit if already loading', () => {
    component.isLoading = true;
    component.submit();
    expect(authServiceSpy.authenticate).not.toHaveBeenCalled();
  });

  it('should handle successful login', () => {
    const mockResponse: SessionInformation = { 
      isAuthenticated: true, 
      token: 'test-token', 
      username: 'testuser' 
    };
    authServiceSpy.authenticate.and.returnValue(of(mockResponse));
    
    component.form.setValue({
      email: 'test@example.com',
      password: 'password123'
    });
    
    component.submit();
    
    expect(authServiceSpy.authenticate).toHaveBeenCalled();
    expect(sessionServiceSpy.authenticate).toHaveBeenCalledWith(mockResponse);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/posts']);
    expect(component.onError).toBeFalse();
  });

  it('should handle login error', () => {
    const mockError = new Error('Login failed');
    authServiceSpy.authenticate.and.returnValue(throwError(() => mockError));
    
    component.form.setValue({
      email: 'test@example.com',
      password: 'password123'
    });
    
    component.submit();
    
    expect(authServiceSpy.authenticate).toHaveBeenCalled();
    expect(sessionServiceSpy.authenticate).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.onError).toBeTrue();
    expect(loggingServiceSpy.logError).toHaveBeenCalledWith(ERROR_MESSAGES.AUTH.LOGIN_ERROR, mockError);
  });
});
