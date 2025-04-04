import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '@core/models/posts/comment.interface';
import { CommentCardComponent } from '../comment-card/comment-card.component';

@Component({
  selector: 'post-comment-list',
  standalone: true,
  imports: [CommonModule, CommentCardComponent],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
  @Output() newComment = new EventEmitter<void>();

  public onNewComment(): void {
    this.newComment.emit();
  }
}
