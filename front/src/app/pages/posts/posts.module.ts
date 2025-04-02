import { NgModule } from '@angular/core';
import { RentalRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCreateComponent } from './post-create/post-create.component';

/**
 * Module de gestion des articles (posts)
 * Utilise le lazy loading : le module n'est chargé que lorsqu'on accède à la route /posts
 * Cela permet d'optimiser les performances en ne chargeant que les composants nécessaires
 */
@NgModule({
  imports: [
    RentalRoutingModule,
    PostDetailComponent,
    PostListComponent,
    PostCreateComponent
  ]
})
export class PostsModule { }
