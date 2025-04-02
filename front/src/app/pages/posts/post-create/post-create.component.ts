import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TopicsService } from "@core/services/topics/topics.service";
import { PostsService } from "@core/services/posts/posts.service";
import { IPostRequest } from '@core/payloads/posts/post.request.interface';
import { LoggingService, LOGGING_SERVICE } from '@core/services/logging/logging.service';
import { Topic } from "@core/models/topics/topic.interface";
import { catchError, finalize, map, of } from 'rxjs';

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
  styleUrls: ['./post-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCreateComponent implements OnInit, OnDestroy {
  public topics: Topic[] = [];
  public readonly postForm: FormGroup;
  private topicsSubscription$?: Subscription;
  private createPostSubscription$?: Subscription;
  public isLoading = false;
  public onError = false;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly topicService: TopicsService,
    private readonly postsService: PostsService,
    @Inject(LOGGING_SERVICE) private readonly loggingService: LoggingService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      topicId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTopics();
  }

  private loadTopics(): void {
    this.isLoading = true;
    this.topicsSubscription$ = this.topicService.getAll().pipe(
      finalize(() => this.isLoading = false),
      catchError((error: Error) => {
        this.loggingService.error('Erreur lors du chargement des topics', error);
        this.onError = true;
        return of([]);
      })
    ).subscribe((topics: Topic[]) => this.topics = topics);
  }

  ngOnDestroy(): void {
    this.topicsSubscription$?.unsubscribe();
    this.createPostSubscription$?.unsubscribe();
  }

  onSubmit(): void {
    if (!this.postForm.valid) return;

    const formValue = this.postForm.value;
    const postRequest: IPostRequest = {
      title: formValue.title,
      description: formValue.content
    };
    
    this.isLoading = true;
    this.createPostSubscription$ = this.postsService.savePost(formValue.topicId, postRequest).pipe(
      finalize(() => this.isLoading = false),
      catchError((error: Error) => {
        this.loggingService.error('Erreur lors de la création du post', error);
        this.onError = true;
        return of(null);
      })
    ).subscribe(() => this.router.navigate(['/posts']));
  }
}
