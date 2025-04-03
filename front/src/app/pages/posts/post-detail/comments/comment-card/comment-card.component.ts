import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '@core/models/posts/comment.interface';
import { DateTimeFormatter } from '@core/utils/date.formatter';

@Component({
  selector: 'comment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentCardComponent {
  @Input({ required: true }) comment!: Comment;

  public get formattedDate(): string {
    return this.comment?.createdAt 
      ? DateTimeFormatter.formatLong(new Date(this.comment.createdAt))
      : '';
  }
} 