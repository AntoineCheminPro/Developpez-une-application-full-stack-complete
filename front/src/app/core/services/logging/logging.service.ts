import { Injectable, InjectionToken } from '@angular/core';

export const LOGGING_SERVICE = new InjectionToken<LoggingService>('LOGGING_SERVICE');

const LOG_FORMAT = {
  TIMESTAMP: (date: Date): string => `[${date.toISOString()}]`,
  ERROR: (message: string): string => `ERROR: ${message}`,
  INFO: (message: string): string => `INFO: ${message}`,
  WARN: (message: string): string => `WARN: ${message}`
} as const;

/**
 * Service de logging pour l'application.
 * Gère les différents niveaux de logs (error, info, warn) avec horodatage.
 * Pourrait être étendu pour envoyer les logs vers un service de monitoring.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  public logError(message: string, error: Error): void {
    console.error(
      `${LOG_FORMAT.TIMESTAMP(new Date())} ${LOG_FORMAT.ERROR(message)}:`,
      error
    );
  }

  public logInfo(message: string): void {
    console.info(
      `${LOG_FORMAT.TIMESTAMP(new Date())} ${LOG_FORMAT.INFO(message)}`
    );
  }

  public logWarn(message: string): void {
    console.warn(
      `${LOG_FORMAT.TIMESTAMP(new Date())} ${LOG_FORMAT.WARN(message)}`
    );
  }
} 