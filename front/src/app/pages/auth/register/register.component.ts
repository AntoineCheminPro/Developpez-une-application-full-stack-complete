import { CommonModule } from '@angular/common';
import {Component, OnDestroy} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterRequest} from "../../../core/payloads/auth/registerRequest.interface";
import {AuthService} from "../../../core/services/auth/auth.service";
import {HeaderComponent} from "../../../components/header/header.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import { authProvider } from '@core/providers/auth.provider';
import { sessionProvider } from '@core/providers/session.provider';
import { storageProvider } from '@core/providers/storage.provider';
import { AuthStorageService } from '@core/services/auth.storage.service';
import { ERROR_MESSAGES } from '@core/constants/error-messages';
import { VALIDATION_PATTERNS } from '@core/constants/validation-patterns';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnComponent } from '../../../components/btn/btn.component';
import { AuthComponent } from '../auth.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BtnComponent,
    AuthComponent
  ],
  providers: [
    authProvider,
    sessionProvider,
    storageProvider,
    AuthStorageService
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  public readonly ERROR_MESSAGES = ERROR_MESSAGES;
  public readonly VALIDATION_PATTERNS = VALIDATION_PATTERNS;

  private registerSubscription$ : Subscription | undefined
  public onError = false;
  public isLoading = false;
  public form!: FormGroup<{ name: FormControl<string | null>; email: FormControl<string | null>; password: FormControl<string | null>; }>

  constructor(private router: Router,
              private authService: AuthService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.VALIDATION_PATTERNS.NAME)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.VALIDATION_PATTERNS.EMAIL)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.VALIDATION_PATTERNS.PASSWORD)
        ]
      ]
    });
  }

  ngOnDestroy(): void {
    this.registerSubscription$?.unsubscribe();
  }

  public submit(): void {
    if (this.form.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.onError = false;

    const registerRequest = this.form.value as RegisterRequest;
    this.registerSubscription$ = this.authService.createUser(registerRequest).subscribe({
      next: (): void => {
        this.snackBar.open(
          "Compte créé avec succès, vous allez être redirigé vers la page de connexion.",
          "Fermer",
          { duration: 2000 }
        );
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: Error) => {
        this.onError = true;
        this.snackBar.open(ERROR_MESSAGES.AUTH.REGISTER_ERROR, "Fermer", { duration: 3000 });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
