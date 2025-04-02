import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../core/services/user/user.service";
import { TopicsService } from "../../core/services/topics/topics.service";
import { Topic } from "../../core/models/topics/topic.interface";
import { User } from "../../core/models/user/user.interface";
import { Subscription } from "rxjs";
import { TopicCardComponent } from "../../components/topics/topic-card/topic-card.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { NgIf } from "@angular/common";
import { userProvider } from '@core/providers/user.provider';
import { topicsProvider } from '@core/providers/topics.provider';
import { SessionService } from "@core/services/auth/auth.session.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TopicCardComponent,
    LoaderComponent,
    NgIf
  ],
  providers: [
    userProvider, 
    topicsProvider,
    SessionService
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private userSubscription$?: Subscription;
  private topicsSubscription$?: Subscription;
  private updateSubscription$?: Subscription;

  public currentUser?: User;
  public subscribedTopics: Topic[] = [];
  public isLoading = false;
  public hasError = false;
  public onErrorFetchingSubscriptions = false;
  public userSubscribedTopicsArray: Topic[] = [];
  public hasSubscriptions = false;
  public form: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
  }>;
  public nameValidationMessage = '';
  public emailValidationMessage = '';

  constructor(
    private userService: UserService,
    private topicsService: TopicsService,
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  ngOnDestroy(): void {
    this.userSubscription$?.unsubscribe();
    this.topicsSubscription$?.unsubscribe();
    this.updateSubscription$?.unsubscribe();
  }

  private fetchUserData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.userSubscription$ = this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        this.form.patchValue({
          name: user.name,
          email: user.email
        });
        this.fetchSubscribedTopics();
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  private fetchSubscribedTopics(): void {
    this.topicsSubscription$ = this.topicsService.getSubscribed().subscribe({
      next: (topics: Topic[]) => {
        this.subscribedTopics = topics;
        this.userSubscribedTopicsArray = topics;
        this.hasSubscriptions = topics.length > 0;
        this.isLoading = false;
      },
      error: () => {
        this.onErrorFetchingSubscriptions = true;
        this.isLoading = false;
      }
    });
  }

  public onSubmit(): void {
    if (this.form.invalid || !this.currentUser) {
      return;
    }

    const updatedUser: Partial<User> = {
      name: this.form.value.name!,
      email: this.form.value.email!
    };

    this.updateSubscription$ = this.userService.updateUser(updatedUser).subscribe({
      next: (user: User) => {
        this.currentUser = user;
      },
      error: () => {
        this.hasError = true;
      }
    });
  }

  public unsubscribeFromTopic(topicId: string): void {
    this.topicsService.unSubscribeToTopic(topicId).subscribe({
      next: () => {
        this.subscribedTopics = this.subscribedTopics.filter(topic => topic.id !== topicId);
        this.userSubscribedTopicsArray = this.userSubscribedTopicsArray.filter(topic => topic.id !== topicId);
        this.hasSubscriptions = this.userSubscribedTopicsArray.length > 0;
      },
      error: () => {
        this.hasError = true;
      }
    });
  }

  public logout(): void {
    this.sessionService.logOut();
  }
}
