import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { PostsService, POSTS_SERVICE } from "@core/services/posts/posts.service";
import { IPost } from "@core/models/posts/post.interface";
import { IComment } from "@core/models/posts/comment.interface";
import { CommentEvent } from "@core/EventEmitters/comment-event.interface";
import { CommentListComponent } from "@app/components/posts/comments/comment-list/comment-list.component";
import { CommentFormComponent } from "@app/components/posts/comments/comment-form/comment-form.component";
import { LOGGING_SERVICE } from "@core/services/logging/logging.service";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommentListComponent,
    CommentFormComponent
  ],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  private readonly postsService = inject(POSTS_SERVICE);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly loggingService = inject(LOGGING_SERVICE);

  public comments: IComment[] = [];
  public postData: IPost | undefined;
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
  }

  ngOnDestroy(): void {
    this.commentsSubscription$?.unsubscribe();
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  public saveComment(commentData: { emitterParams: CommentEvent }): void {
    if (!this.postData?.id) {
      this.loggingService.error('Impossible de sauvegarder le commentaire', new Error('Post ID manquant'));
      return;
    }

    this.isLoading = true;
    const saveCommentSubscription$ = this.postsService
      .saveComment(this.postData.id, commentData.emitterParams.comment)
      .subscribe({
        next: () => {
          const newComment: IComment = {
            id: 0,
            username: "me",
            text: commentData.emitterParams.comment
          };

          this.comments.unshift(newComment);
          commentData.emitterParams.onSuccess(true);
          this.snackBar.open("Commentaire créé avec succès !", "Fermer", { duration: 2000 });
        },
        error: (error: Error) => {
          this.loggingService.error('Erreur lors de la création du commentaire', error);
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
    const navigationData = navigation?.extras?.state as { data: IPost } | undefined;

    if (navigationData?.data) {
      this.postData = navigationData.data;
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.postData));
    } else {
      try {
        const storedData = sessionStorage.getItem(this.STORAGE_KEY);
        this.postData = storedData ? JSON.parse(storedData) : undefined;
      } catch (error) {
        this.loggingService.error('Erreur lors du chargement des données du post', error as Error);
        this.hasError = true;
      }
    }

    if (!this.hasError && !this.postData?.id) {
      this.hasError = true;
      this.loggingService.error('Données du post invalides', new Error('Post ID manquant'));
    }
  }

  private loadComments(): void {
    if (!this.postData?.id) {
      return;
    }

    this.isLoading = true;
    this.commentsSubscription$ = this.postsService
      .getAllComments(this.postData.id)
      .subscribe({
        next: (comments: IComment[]) => {
          this.comments = comments;
          this.isLoading = false;
        },
        error: (error: Error) => {
          this.loggingService.error('Erreur lors du chargement des commentaires', error);
          this.isLoading = false;
        }
      });
  }
}
