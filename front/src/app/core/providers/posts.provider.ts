import { PostsService } from '../services/posts/posts.service';
import { PostsFakerService } from '../services/faker/posts.faker.service';
import { environment } from '../../../environments/environment';

export const postsProvider = {
  provide: PostsService,
  useClass: environment.useFaker ? PostsFakerService : PostsService
}; 