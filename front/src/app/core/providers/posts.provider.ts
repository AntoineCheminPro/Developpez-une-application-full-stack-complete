import { PostsService, POSTS_SERVICE } from '../services/posts/posts.service';
import { PostsFakerService } from '../services/faker/posts.faker.service';
import { environment } from '../../../environments/environment';

export const postsProvider = {
  provide: POSTS_SERVICE,
  useClass: environment.useFaker ? PostsFakerService : PostsService
}; 