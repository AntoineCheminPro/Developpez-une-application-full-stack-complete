import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopicEvent } from "../../../core/EventEmitters/topic-event.interface";
import { BtnComponent } from '../../../components/btn/btn.component';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [
    BtnComponent
  ],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss'
})
export class TopicCardComponent {
  // Inputs
  @Input() public id!: string;
  @Input() public title!: string;
  @Input() public description!: string;
  @Input() public isSubscribed!: boolean;
  @Input() public isSubscribeCase: boolean = false;
  @Input() public disableButton: boolean = false;

  // Outputs
  @Output() public onSubscribe: EventEmitter<TopicEvent> = new EventEmitter<TopicEvent>();

  /**
   * Émet vers le composant parent l'ID du topic et son callback
   */
  public fn(): void {
    this.onSubscribe.emit({
      id: this.id,
      isSubscribed: !this.isSubscribed
    });
  }

  /**
   * Gère le statut de succès de la souscription
   * @param success - État de la souscription
   */
  private handleSuccess(success: boolean): void {
    this.isSubscribed = success;
  }
}
