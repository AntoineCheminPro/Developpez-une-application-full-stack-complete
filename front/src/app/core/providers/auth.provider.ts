import { AuthService } from '../services/auth/auth.service';
import { AuthFakerService } from '../services/faker/auth.faker.service';
import { environment } from '../../../environments/environment';

export const authProvider = {
  provide: AuthService,
  useClass: environment.useFaker ? AuthFakerService : AuthService
}; 