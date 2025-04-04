import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BtnComponent } from '@app/components/btn/btn.component';
import { AuthComponent } from '../auth.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';
import { ERROR_MESSAGES } from '@core/constants/error-messages';
import { VALIDATION_PATTERNS } from '@core/constants/validation-patterns';
import { authProvider } from '@core/providers/auth.provider';
import { sessionProvider } from '@core/providers/session.provider';
import { storageProvider } from '@core/providers/storage.provider';
import { AuthStorageService } from '@core/services/auth.storage.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['createUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      declarations: [
        RegisterComponent,
        BtnComponent,
        AuthComponent
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        AuthStorageService,
        authProvider,
        sessionProvider,
        storageProvider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
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
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
  });

  it('should have name validation', () => {
    const nameControl = component.form.get('name');
    expect(nameControl?.hasValidator(Validators.required)).toBeTrue();
    expect(nameControl?.hasValidator(Validators.pattern(VALIDATION_PATTERNS.NAME))).toBeTrue();
  });

  it('should have email validation', () => {
    const emailControl = component.form.get('email');
    expect(emailControl?.hasValidator(Validators.required)).toBeTrue();
    expect(emailControl?.hasValidator(Validators.pattern(VALIDATION_PATTERNS.EMAIL))).toBeTrue();
  });

  it('should have password validation', () => {
    const passwordControl = component.form.get('password');
    expect(passwordControl?.hasValidator(Validators.required)).toBeTrue();
    expect(passwordControl?.hasValidator(Validators.pattern(VALIDATION_PATTERNS.PASSWORD))).toBeTrue();
  });

  it('should not submit if form is invalid', () => {
    component.submit();
    expect(authServiceSpy.createUser).not.toHaveBeenCalled();
  });

  it('should not submit if already loading', () => {
    component.isLoading = true;
    component.submit();
    expect(authServiceSpy.createUser).not.toHaveBeenCalled();
  });

  it('should handle successful registration', () => {
    authServiceSpy.createUser.and.returnValue(of(void 0));
    
    component.form.setValue({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'Password123!'
    });
    
    jasmine.clock().install();
    component.submit();
    jasmine.clock().tick(2000);
    
    expect(authServiceSpy.createUser).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      "Compte créé avec succès, vous allez être redirigé vers la page de connexion.",
      "Fermer",
      { duration: 2000 }
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.onError).toBeFalse();
    
    jasmine.clock().uninstall();
  });

  it('should handle registration error', () => {
    const mockError = new Error('Registration failed');
    authServiceSpy.createUser.and.returnValue(throwError(() => mockError));
    
    component.form.setValue({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'Password123!'
    });
    
    component.submit();
    
    expect(authServiceSpy.createUser).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      ERROR_MESSAGES.AUTH.REGISTER_ERROR,
      "Fermer",
      { duration: 3000 }
    );
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.onError).toBeTrue();
  });
});
