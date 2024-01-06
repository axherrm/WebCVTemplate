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

  @Input() type: "light" | "dark" = "dark";

  @Input() styleClass: string = "";

  cardStyleClass: string;

  ngAfterContentInit() {
    this.cardStyleClass = this.type==='light' ? 'heading-card-light' : 'heading-card-dark';
    if (this.styleClass.length > 0) {
      this.cardStyleClass += " " + this.styleClass;
    }
  }

}
