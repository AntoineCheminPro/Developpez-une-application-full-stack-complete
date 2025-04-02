import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit, OnDestroy {
  private readonly postsService: PostsService = inject(PostsService);
  private readonly router: Router = inject(Router);
  private postsSubscription$?: Subscription;

  public readonly ERROR_MESSAGES = {
    FETCH: 'Une erreur est survenue lors de la récupération des articles'
  } as const;

  public posts: Post[] = [];
  public hasError = false;
  public hasData = false;
  public isAscending = true;
  public isLoading = false;

  ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.isLoading = true;
    this.postsService.isFetching.subscribe(isFetching => {
      this.isLoading = isFetching;
    });

    this.postsSubscription$ = this.postsService.getFeed().pipe(
      map((posts: Post[]) => posts.map(post => ({
        ...post,
        createdAt: DateTimeFormatter.Format(new Date(post.createdAt))
      }))),
      catchError((error: Error) => {
        this.hasError = true;
        console.error(this.ERROR_MESSAGES.FETCH, error);
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe((posts: Post[]) => {
      this.hasData = posts.length > 0;
      this.posts = CollectionSort.sortByCreationDateDescending(posts);
    });
  }

  public onSortPosts(): void {
    this.isAscending = !this.isAscending;
    this.posts = this.isAscending
      ? CollectionSort.sortByCreationDateDescending(this.posts)
      : CollectionSort.sortByCreationDateAscending(this.posts);
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
