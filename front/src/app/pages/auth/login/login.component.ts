import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRequest} from "@core/payloads/auth/loginRequest.interface";
import {SessionInformation} from "@core/models/auth/sessionInformation.interface";
import {SessionService} from "@core/services/auth/auth.session.service";
import {HeaderComponent} from "../../../components/header/header.component";
import {Subscription} from "rxjs";
import {LoggingService} from "@core/services/logging/logging.service";
import { BtnComponent } from '@app/components/btn/btn.component';
import { AuthService } from '@core/services/auth/auth.service';
import { authProvider } from '@core/providers/auth.provider';
import { sessionProvider } from '@core/providers/session.provider';
import { storageProvider } from '@core/providers/storage.provider';
import { AuthStorageService } from '@core/services/auth.storage.service';
import { ERROR_MESSAGES } from '@core/constants/error-messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    BtnComponent
  ],
  providers: [
    authProvider,
    sessionProvider,
    storageProvider,
    AuthStorageService
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  private readonly VALIDATION_PATTERNS = {
    EMAIL: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
  } as const;

  private loginSubscription$: Subscription | undefined;
  
  public onError = false;
  public isLoading = false;
  public loginForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly sessionService: SessionService,
    private readonly loggingService: LoggingService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(this.VALIDATION_PATTERNS.EMAIL)
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  public submit(): void {
    if (this.loginForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.onError = false;

    const loginRequest = this.loginForm.value as LoginRequest;
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
