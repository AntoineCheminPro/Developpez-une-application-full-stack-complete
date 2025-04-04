import { LoggingService, LOGGING_SERVICE } from '../services/logging/logging.service';

export const loggingProvider = {
  provide: LOGGING_SERVICE,
  useClass: LoggingService
}; 