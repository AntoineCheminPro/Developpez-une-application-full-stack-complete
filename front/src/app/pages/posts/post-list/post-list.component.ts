import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../../core/services/posts/posts.service";
import {IPost} from "../../../core/models/posts/post.interface";
import {catchError, map, of, Subscription} from 'rxjs';
import {Router, RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {NgClass} from "@angular/common";
import {DateTimeFormatter} from "../../../core/utils/date.formatter";
import {CollectionSort} from "../../../core/utils/collection.sort";
import { LoaderComponent } from '../../../core/components/loader/loader.component';
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
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  private readonly postsService: PostsService = inject(PostsService);
  private readonly router: Router = inject(Router);
  public posts: IPost[] = [];
  public postsSubscription$: Subscription | undefined;
  public hasError: boolean = false;
  public hasData: boolean = false;
  public isAscending: boolean = true;
  public isLoading: boolean = false;

  ngOnDestroy(): void {
    this.postsSubscription$?.unsubscribe();
  }

  ngOnInit() : void {
    this.postsService.isFetching.subscribe(isFetching => {
      this.isLoading = isFetching;
    });

    this.postsSubscription$ = this.postsService.getFeed().pipe(
      map((values: IPost[]) => {
        return values.map(post => {
          return {...post, createdAt: DateTimeFormatter.Format(new Date(post.createdAt))};
        });
      }),
      catchError(error => {
        this.hasError = true;
        console.error('An error occurred:', error);
        return of([]);
      })
    ).subscribe(
      (values: IPost[]) => {
        this.hasData = values.length != 0;
        this.posts = CollectionSort.sortByCreationDateDescending(values);
      }
    );
  }

  public sortPosts(): void {
    this.isAscending = !this.isAscending;
    if(this.isAscending)
      this.posts = CollectionSort.sortByCreationDateDescending(this.posts);
    else
      this.posts = CollectionSort.sortByCreationDateAscending(this.posts);
  }

  public createPost(): void {
    this.router.navigate(['posts/post-create']);
  }

  public navigateWithData(post: IPost) : void {
    this.router.navigate(['posts/post-detail'], { state: { data: post } });
  }
}
