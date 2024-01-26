import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent {

  @Input() link: string;
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

}
