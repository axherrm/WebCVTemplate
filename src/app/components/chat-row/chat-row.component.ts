import {Component, HostBinding, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'chat-row',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './chat-row.component.html',
  styleUrl: './chat-row.component.scss'
})
export class ChatRowComponent {

  @Input() text: string;
  @Input() side: "left" | "right" = "left";
  /**
   * Whether a message is not the first message on the same side of the chat.
   */
  @Input() @HostBinding("class.following-message") followingMessage: boolean = false;
  /**
   * Whether the message is sent successfully. Not sent message are styled differently.
   */
  @Input() sent: boolean = true;

  // @HostBinding("style.flex-direction") flexDirection: string = "row";
  @HostBinding("class.left") get left() { return this.isLeft() }
  @HostBinding("class.right") get right() { return !this.isLeft() }

  isLeft(): boolean {
    return this.side === "left";
  }

}
