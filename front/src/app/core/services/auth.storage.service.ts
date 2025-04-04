import { Injectable } from '@angular/core';

/**
 * Service gérant le stockage des informations d'authentification.
 * Permet de stocker, récupérer et supprimer le token d'authentification.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly storage: Storage;

  constructor() {
    this.storage = window.sessionStorage;
  }

  getToken(): string | null {
    return this.storage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    this.storage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    this.storage.removeItem(this.TOKEN_KEY);
  }
}
