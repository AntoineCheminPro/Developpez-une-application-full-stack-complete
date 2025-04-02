import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IComment } from '../../../../core/models/posts/comment.interface';

@Component({
  selector: 'post-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  @Input() comments: IComment[] = [];
}
