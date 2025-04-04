import { Injectable } from '@angular/core';

const STORAGE_KEYS = {
  TOKEN: 'token'
} as const;

/**
 * Service gérant le stockage des informations d'authentification.
 * Permet de stocker, récupérer et supprimer le token d'authentification.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor(private readonly storage: Storage = sessionStorage) {
    console.log('🔑 AuthStorageService initialized');
  }

  public getToken(): string | null {
    return this.storage.getItem(STORAGE_KEYS.TOKEN);
  }

  public setToken(token: string): void {
    this.storage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  public removeToken(): void {
    this.storage.removeItem(STORAGE_KEYS.TOKEN);
  }
}
