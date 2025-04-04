import { TopicsService } from '../services/topics/topics.service';
import { TopicsFakerService } from '../services/faker/topics.faker.service';
import { environment } from '../../../environments/environment';

export const topicsProvider = {
  provide: TopicsService,
  useClass: environment.useFaker ? TopicsFakerService : TopicsService
}; 