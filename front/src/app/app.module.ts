import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TopicComponent } from './pages/topic/topic.component';
import { PostCreateComponent } from './pages/posts/post-create/post-create.component';
import { PostDetailComponent } from './pages/posts/post-detail/post-detail.component';
import { PostListComponent } from './pages/posts/post-list/post-list.component';
import { UserComponent } from './pages/user/user.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { HeaderComponent } from './components/auth/header/header.component';
import { CommentFormComponent } from './components/posts/comments/comment-form/comment-form.component';
import { CommentListComponent } from './components/posts/comments/comment-list/comment-list.component';
import { PostCardComponent } from './components/posts/post-card/post-card.component';
import { TopicCardComponent } from './components/topics/topic-card/topic-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, RegisterComponent, TopicComponent, PostCreateComponent, PostDetailComponent, PostListComponent, UserComponent, TopicsComponent, HeaderComponent, CommentFormComponent, CommentListComponent, PostCardComponent, TopicCardComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
