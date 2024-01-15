import {Component, Input} from '@angular/core';

@Component({
  selector: 'heading-card',
  standalone: true,
  imports: [],
  templateUrl: './heading-card.component.html',
  styleUrl: './heading-card.component.scss'
})
export class HeadingCardComponent {

  @Input() heading: string;

  @Input() type: "light" | "dark" | "3" = "dark";

  @Input() styleClass: string = "";

  cardStyleClass: string;

  ngAfterContentInit() {
    switch (this.type) {
      case "light":
        this.cardStyleClass = "heading-card-light";
        break;
      case "3":
        this.cardStyleClass = "heading-card-3";
        break;
      default:
        this.cardStyleClass = "heading-card-dark";
        break;
    }
    if (this.styleClass.length > 0) {
      this.cardStyleClass += " " + this.styleClass;
    }
  }

}
