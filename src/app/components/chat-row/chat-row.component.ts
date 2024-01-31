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

  @Input() side: "left" | "right" = "left";

  // @HostBinding("style.flex-direction") flexDirection: string = "row";
  @HostBinding("class.left") get left() { return this.isLeft() }
  @HostBinding("class.right") get right() { return !this.isLeft() }

  isLeft(): boolean {
    return this.side === "left";
  }

}
