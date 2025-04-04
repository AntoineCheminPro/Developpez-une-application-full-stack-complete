import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Components
import { BtnComponent } from '@app/components/btn/btn.component';
import { AuthComponent } from '../auth.component';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Services
import { AuthService } from '@core/services/auth/auth.service';
import { SessionService } from '@core/services/auth/auth.session.service';
import { LoggingService } from '@core/services/logging/logging.service';
import { AuthStorageService } from '@core/services/auth.storage.service';

// Models & Interfaces
import { LoginRequest } from '@core/payloads/auth/loginRequest.interface';
import { SessionInformation } from '@core/models/auth/sessionInformation.interface';

// Constants
import { ERROR_MESSAGES } from '@core/constants/error-messages';
import { VALIDATION_PATTERNS } from '@core/constants/validation-patterns';

// Providers
import { authProvider } from '@core/providers/auth.provider';
import { sessionProvider } from '@core/providers/session.provider';
import { storageProvider } from '@core/providers/storage.provider';

// RxJS
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BtnComponent,
    MatFormFieldModule,
    MatInputModule,
    AuthComponent
  ],
  providers: [
    authProvider,
    sessionProvider,
    storageProvider,
    AuthStorageService
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {
  public readonly ERROR_MESSAGES = ERROR_MESSAGES;
  public readonly VALIDATION_PATTERNS = VALIDATION_PATTERNS;

  private loginSubscription$: Subscription | undefined;
  
  public onError = false;
  public isLoading = false;
  public isFormValid = false;
  public form!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly sessionService: SessionService,
    private readonly loggingService: LoggingService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // S'abonner aux changements de valeur
    this.form.valueChanges.subscribe(() => {
      this.isFormValid = this.form.valid;
    });

    // S'abonner aux changements de statut
    this.form.statusChanges.subscribe(() => {
      this.isFormValid = this.form.valid;
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.isFormValid = this.form.valid;
  }

  public submit(): void {
    if (this.form.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.onError = false;

    const loginRequest = this.form.value as LoginRequest;
    this.loginSubscription$ = this.authService.authenticate(loginRequest).subscribe({
      next: (response: SessionInformation): void => {
        this.sessionService.authenticate(response);
        this.router.navigate(['/posts']);
      },
      error: (error: Error) => {
        this.onError = true;
        this.loggingService.logError(ERROR_MESSAGES.AUTH.LOGIN_ERROR, error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }


  ngOnDestroy(): void {
    this.loginSubscription$?.unsubscribe();
  }
}
