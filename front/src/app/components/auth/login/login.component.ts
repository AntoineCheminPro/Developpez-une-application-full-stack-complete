import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRequest} from "@core/payloads/auth/loginRequest.interface";
import {SessionInformation} from "@core/models/auth/sessionInformation.interface";
import {SessionService} from "@core/services/auth/auth.session.service";
import {HeaderComponent} from "../../header/header.component";
import {Subscription} from "rxjs";
import {LoggingService} from "@core/services/logging/logging.service";
import { BtnComponent } from '@app/components/btn/btn.component';
import { AuthService } from '@core/services/auth/auth.service';
import { authProvider } from '@core/providers/auth.provider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    BtnComponent
  ],
  providers: [authProvider],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public loginSubscription$: Subscription | undefined;
  public onError = false;
  public isLoading = false;
  public loginForm: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null>; }>

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
    private loggingService: LoggingService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription$?.unsubscribe();
  }

  public submit(): void {
    if (this.loginForm.invalid || this.isLoading) {
      return;
    }
    
    this.isLoading = true;
    this.onError = false;

    const loginRequest = this.loginForm.value as LoginRequest;
    this.loginSubscription$ = this.authService.login(loginRequest).subscribe({
      next: (response: SessionInformation): void => {
        this.sessionService.logIn(response);
        this.router.navigate(['/posts']);
      },
      error: (error: Error) => {
        this.onError = true;
        this.loggingService.error('Erreur de connexion', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
