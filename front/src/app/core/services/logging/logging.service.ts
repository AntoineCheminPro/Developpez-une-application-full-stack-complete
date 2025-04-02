import { Injectable, InjectionToken } from '@angular/core';

export const LOGGING_SERVICE = new InjectionToken<LoggingService>('LOGGING_SERVICE');

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  error(message: string, error: Error): void {
    console.error(`[${new Date().toISOString()}] ${message}:`, error);
    // Ici, on pourrait ajouter l'envoi des erreurs à un service de monitoring
  }

  info(message: string): void {
    console.info(`[${new Date().toISOString()}] ${message}`);
  }

  warn(message: string): void {
    console.warn(`[${new Date().toISOString()}] ${message}`);
  }
} 