import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCreateComponent } from './post-create/post-create.component';

/**
 * Module de routing pour les articles (posts)
 * Sépare les routes des articles du routing principal pour :
 * 1. Une meilleure organisation du code
 * 2. Permettre le lazy loading des composants des articles
 * 3. Isoler la logique de navigation des articles
 * 
 * Routes disponibles :
 * - /posts : Liste des articles
 * - /posts/post-detail : Détail d'un article
 * - /posts/post-create : Création d'un article
 */
const routes: Routes = [
  { title: 'Posts', path: '', component: PostListComponent },
  { title: 'Post - detail', path: 'post-detail', component: PostDetailComponent },
  { title: 'Post - create', path: 'post-create', component: PostCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalRoutingModule { }
