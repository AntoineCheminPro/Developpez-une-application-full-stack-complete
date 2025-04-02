import { UserService } from '../services/user/user.service';
import { UserFakerService } from '../services/faker/user.faker.service';
import { environment } from '../../../environments/environment';

export const userProvider = {
  provide: UserService,
  useClass: environment.useFaker ? UserFakerService : UserService
}; 