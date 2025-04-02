import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PostsService, POSTS_SERVICE } from "@core/services/posts/posts.service";
import { Post } from "@core/models/posts/post.interface";
import { catchError, map, of, Subscription, finalize } from 'rxjs';
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { DateTimeFormatter } from "@core/utils/date.formatter";
import { CollectionSort } from "@core/utils/collection.sort";
import { LoaderComponent } from '../../../components/loader/loader.component';
import { PostCardComponent } from '../../../components/posts/post-card/post-card.component';
import { postsProvider } from '@core/providers/posts.provider';
import { LOGGING_SERVICE } from '@core/services/logging/logging.service';
import { loggingProvider } from '@core/providers/logging.provider';

enum PostListState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

const MESSAGES = {
  ERROR: {
    FETCH: 'Une erreur est survenue lors de la récupération des articles'
  },
  LOADING: 'Chargement des articles...',
  EMPTY: 'Aucun article disponible...',
  SORT: {
    ASC: 'Trier par date ▲',
    DESC: 'Trier par date ▼'
  }
} as const;

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatButtonModule,
    LoaderComponent,
    PostCardComponent
  ],
  providers: [postsProvider, loggingProvider],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit, OnDestroy {
  private readonly postsService: PostsService = inject(POSTS_SERVICE);
  private readonly router: Router = inject(Router);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly loggingService = inject(LOGGING_SERVICE);
  private postsSubscription$?: Subscription;

  public readonly state = PostListState;
  public readonly messages = MESSAGES;

  public posts: Post[] = [];
  public currentState: PostListState = PostListState.IDLE;
  public isAscending = true;

  constructor() {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.currentState = PostListState.LOADING;
    this.cdr.markForCheck();

    this.postsSubscription$ = this.postsService.getFeed()
      .pipe(
        finalize(() => {
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (posts: Post[]) => {
          this.currentState = posts.length > 0 ? PostListState.SUCCESS : PostListState.IDLE;
          this.posts = CollectionSort.sortByCreationDateDescending(posts);
          this.cdr.markForCheck();
        },
        error: (error: Error) => {
          this.currentState = PostListState.ERROR;
          this.loggingService.logError(this.messages.ERROR.FETCH, error);
          this.cdr.markForCheck();
        }
      });
  }

  public sortPosts(): void {
    this.isAscending = !this.isAscending;
    this.posts = this.isAscending
      ? CollectionSort.sortByCreationDateDescending(this.posts)
      : CollectionSort.sortByCreationDateAscending(this.posts);
    this.cdr.markForCheck();
  }

  public navigateToCreate(): void {
    this.router.navigate(['posts/post-create']);
  }

  public navigateToDetail(post: Post): void {
    this.router.navigate(['posts/post-detail'], { state: { data: post } });
  }

  ngOnDestroy(): void {
    this.postsSubscription$?.unsubscribe();
  }
}
