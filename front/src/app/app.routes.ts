import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { UnauthGuard } from "./core/guards/unauth.guard";
import { TopicsComponent } from "./pages/topics/topics.component";
import { UserComponent } from "./pages/user/user.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    canActivate: [UnauthGuard],
    path: 'login',
    title: 'Connexion',
    component: LoginComponent,
  },
  {
    canActivate: [UnauthGuard],
    path: 'register',
    title: 'Inscription',
    component: RegisterComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'posts',
    title: 'Articles',
    loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'topics',
    title: 'Thèmes',
    component: TopicsComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'user',
    title: 'Profil',
    component: UserComponent
  }
];
