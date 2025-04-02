import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PostsService } from "@core/services/posts/posts.service";
import { Post } from "@core/models/posts/post.interface";
import { catchError, map, of, Subscription, finalize } from 'rxjs';
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { NgClass } from "@angular/common";
import { DateTimeFormatter } from "@core/utils/date.formatter";
import { CollectionSort } from "@core/utils/collection.sort";
import { LoaderComponent } from '../../../components/loader/loader.component';
import { PostCardComponent } from '../../../components/posts/post-card/post-card.component';
import { postsProvider } from '@core/providers/posts.provider';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    NgClass,
    LoaderComponent,
    PostCardComponent
  ],
  providers: [postsProvider],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit, OnDestroy {
  private readonly postsService: PostsService = inject(PostsService);
  private readonly router: Router = inject(Router);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private postsSubscription$?: Subscription;

  public readonly ERROR_MESSAGES = {
    FETCH: 'Une erreur est survenue lors de la récupération des articles'
  } as const;

  public posts: Post[] = [];
  public hasError = false;
  public hasData = false;
  public isAscending = true;
  public isLoading = false;

  constructor() {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.isLoading = true;
    this.hasError = false;
    this.cdr.markForCheck();

    this.postsSubscription$ = this.postsService.getFeed()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (posts: Post[]) => {
          this.hasData = posts.length > 0;
          this.posts = CollectionSort.sortByCreationDateDescending(posts);
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.hasError = true;
          console.error(this.ERROR_MESSAGES.FETCH, error);
          this.cdr.markForCheck();
        }
      });
  }

  public onSortPosts(): void {
    this.isAscending = !this.isAscending;
    this.posts = this.isAscending
      ? CollectionSort.sortByCreationDateDescending(this.posts)
      : CollectionSort.sortByCreationDateAscending(this.posts);
    this.cdr.markForCheck();
  }

  public onCreatePost(): void {
    this.router.navigate(['posts/post-create']);
  }

  public onPostClick(post: Post): void {
    this.router.navigate(['posts/post-detail'], { state: { data: post } });
  }

  ngOnDestroy(): void {
    this.postsSubscription$?.unsubscribe();
  }
}
