import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ITopic } from '@core/models/topics/topic.interface';
import { TopicsService, TOPICS_SERVICE } from '@core/services/topics/topics.service';
import { PostsService, POSTS_SERVICE } from '@core/services/posts/posts.service';
import { IPostRequest } from '@core/payloads/posts/post.request.interface';
import { LoggingService, LOGGING_SERVICE } from '@core/services/logging/logging.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  public topics: ITopic[] = [];
  public postForm: FormGroup;
  private topicsSubscription$: Subscription | undefined;
  private createPostSubscription$: Subscription | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    @Inject(TOPICS_SERVICE) private topicService: TopicsService,
    @Inject(POSTS_SERVICE) private postsService: PostsService,
    @Inject(LOGGING_SERVICE) private loggingService: LoggingService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      topicId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.topicsSubscription$ = this.topicService.getAll().subscribe({
      next: (topics: ITopic[]) => this.topics = topics,
      error: (error: Error) => {
        this.loggingService.error('Erreur lors du chargement des topics', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.topicsSubscription$?.unsubscribe();
    this.createPostSubscription$?.unsubscribe();
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;
      const postRequest: IPostRequest = {
        title: formValue.title,
        description: formValue.content
      };
      
      this.createPostSubscription$ = this.postsService.savePost(formValue.topicId, postRequest).subscribe({
        next: () => this.router.navigate(['/posts']),
        error: (error: Error) => {
          this.loggingService.error('Erreur lors de la création du post', error);
        }
      });
    }
  }
}
