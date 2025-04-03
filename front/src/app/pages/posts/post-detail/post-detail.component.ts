import { Component, OnDestroy, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { POSTS_SERVICE } from "@core/services/posts/posts.service";
import { Post } from "@core/models/posts/post.interface";
import { Comment } from "@core/models/posts/comment.interface";
import { CommentEvent } from "@core/EventEmitters/comment-event.interface";
import { CommentListComponent } from "@app/pages/posts/post-detail/comments/comment-list/comment-list.component";
import { CommentFormComponent } from "@app/pages/posts/post-detail/comments/comment-form/comment-form.component";
import { LOGGING_SERVICE } from "@core/services/logging/logging.service";
import { postsProvider } from '@core/providers/posts.provider';
import { loggingProvider } from '@core/providers/logging.provider';
import { DateTimeFormatter } from '@core/utils/date.formatter';
import { TitleService } from '@core/services/title/title.service';

const ERROR_MESSAGES = {
  SAVE_COMMENT: 'Impossible de sauvegarder le commentaire',
  LOAD_POST: 'Erreur lors du chargement des données du post',
  LOAD_COMMENTS: 'Erreur lors du chargement des commentaires',
  INVALID_POST: 'Données du post invalides'
} as const;

const SUCCESS_MESSAGES = {
  COMMENT_CREATED: 'Commentaire créé avec succès !'
} as const;

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    FormsModule,
    CommentListComponent,
    CommentFormComponent
  ],
  providers: [postsProvider, loggingProvider],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailComponent implements OnInit, OnDestroy {
  private readonly postsService = inject(POSTS_SERVICE);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly loggingService = inject(LOGGING_SERVICE);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly titleService = inject(TitleService);

  public comments: Comment[] = [];
  public postData: Post | undefined;
  public hasError = false;
  public isLoading = false;

  private commentsSubscription$?: Subscription;
  private readonly STORAGE_KEY = 'postData';

  constructor() {
    this.loadPostData();
  }

  ngOnInit(): void {
    if (this.hasError) {
      return;
    }

    this.loadComments();
    if (this.postData?.title) {
      this.titleService.setTitle(this.postData.title);
    }
  }

  ngOnDestroy(): void {
    this.commentsSubscription$?.unsubscribe();
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  public saveComment(commentData: { emitterParams: CommentEvent }): void {
    if (!this.postData?.id) {
      this.loggingService.logError(ERROR_MESSAGES.SAVE_COMMENT, new Error('Post ID manquant'));
      return;
    }

    this.isLoading = true;
    const saveCommentSubscription$ = this.postsService
      .createComment(this.postData.id, commentData.emitterParams.comment)
      .subscribe({
        next: () => {
          const newComment: Comment = {
            id: '0',
            username: "me",
            text: commentData.emitterParams.comment,
            createdAt: new Date().toISOString()
          };

          this.comments.unshift(newComment);
          commentData.emitterParams.onSuccess(true);
          this.snackBar.open(SUCCESS_MESSAGES.COMMENT_CREATED, "Fermer", { duration: 2000 });
        },
        error: (error: Error) => {
          this.loggingService.logError(ERROR_MESSAGES.SAVE_COMMENT, error);
          commentData.emitterParams.onSuccess(false);
        },
        complete: () => {
          this.isLoading = false;
          saveCommentSubscription$.unsubscribe();
        }
      });
  }

  private loadPostData(): void {
    const navigation = this.router.getCurrentNavigation();
    const navigationData = navigation?.extras?.state as { data: Post } | undefined;

    if (navigationData?.data) {
      this.postData = navigationData.data;
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.postData));
    } else {
      try {
        const storedData = sessionStorage.getItem(this.STORAGE_KEY);
        this.postData = storedData ? JSON.parse(storedData) : undefined;
      } catch (error) {
        this.loggingService.logError(ERROR_MESSAGES.LOAD_POST, error as Error);
        this.hasError = true;
      }
    }

    if (!this.hasError && !this.postData?.id) {
      this.hasError = true;
      this.loggingService.logError(ERROR_MESSAGES.INVALID_POST, new Error('Post ID manquant'));
    }
  }

  private loadComments(): void {
    if (!this.postData?.id) {
      return;
    }

    this.isLoading = true;
    this.commentsSubscription$ = this.postsService
      .getComments(this.postData.id)
      .subscribe({
        next: (comments: Comment[]) => {
          this.comments = [...comments];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error: Error) => {
          this.loggingService.logError(ERROR_MESSAGES.LOAD_COMMENTS, error);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  public get formattedDate(): string {
    if (!this.postData?.createdAt) return '';
    
    const date = new Date(this.postData.createdAt);
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    
    return mobileQuery.matches 
      ? DateTimeFormatter.formatShort(date)
      : DateTimeFormatter.formatLong(date);
  }
}
