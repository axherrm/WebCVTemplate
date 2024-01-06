import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";

@Component({
  selector: 'heading-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './heading-card.component.html',
  styleUrl: './heading-card.component.scss'
})
export class HeadingCardComponent {

  @Input() heading: string;

  @Input() type?: "light" | "dark" = "dark";

}
