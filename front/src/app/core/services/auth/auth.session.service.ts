import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SessionInformation} from "../../models/auth/sessionInformation.interface";
import {AuthStorageService} from "../auth.storage.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

const defaultAuthenticationState: SessionInformation = {
  isAuthenticated: false,
  username: undefined,
  token: undefined
} as const;

@Injectable({
  providedIn: 'root'
})
export class SessionService implements OnDestroy {
  private readonly sessionSubject: BehaviorSubject<SessionInformation> = new BehaviorSubject<SessionInformation>(defaultAuthenticationState);
  private readonly session$: Observable<SessionInformation> = this.sessionSubject.asObservable();

  constructor(
    private readonly authStorageService: AuthStorageService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    console.log('🔑 SessionService initialized');
    this.session$.subscribe((sessionInfo: SessionInformation) => {
      if (sessionInfo.isAuthenticated) {
        this.authStorageService.setToken(sessionInfo.token!);
      }
    });
  }

  ngOnDestroy(): void {
    this.sessionSubject.next(defaultAuthenticationState);
    this.sessionSubject.complete();
    this.authStorageService.removeToken();
  }

  public authenticate(userSession: SessionInformation): void {
    this.sessionSubject.next(userSession);
  }

  public logout(reason: string = ''): void {
    this.sessionSubject.next(defaultAuthenticationState);
    this.authStorageService.removeToken();
    
    const message = reason === '' 
      ? "Déconnexion réussie, vous allez être redirigé vers la page d'accueil."
      : reason;
      
    this.snackBar.open(message, "Fermer", { duration: 2000 });
    
    setTimeout((): void => {
      this.router.navigate(['/home']);
    }, 2_000);
  }
}
