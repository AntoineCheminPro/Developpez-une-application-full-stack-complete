import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommentEvent } from "../../../../core/EventEmitters/comment-event.interface";

@Component({
  selector: 'post-comment-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
  @Output() addCommentEvent = new EventEmitter<{ emitterParams: CommentEvent }>();
  public commentText: string = '';
  public maxLengthCommentText: number = 2000;
  public remainingCharacters: number = this.maxLengthCommentText;

  updateRemainingCharacters(): void {
    this.remainingCharacters = this.maxLengthCommentText - this.commentText.length;
  }

  onSuccess(success: boolean): void {
    if(success){
      this.commentText = '';
      this.remainingCharacters = this.maxLengthCommentText;
    }
  }

  onSubmit(event: Event): void {
    if (!this.commentText.trim()) {
      event.stopPropagation();
      return;
    }
    this.addCommentEvent.emit({
      emitterParams: {
        comment: this.commentText.trim(),
        onSuccess: this.onSuccess.bind(this)
      }
    });
  }
}
