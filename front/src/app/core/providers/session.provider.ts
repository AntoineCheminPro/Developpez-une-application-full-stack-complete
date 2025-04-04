import { SessionService } from '../services/auth/auth.session.service';

/**
 * Provider pour le service de session.
 */
export const sessionProvider = {
  provide: SessionService,
  useClass: SessionService
}; 