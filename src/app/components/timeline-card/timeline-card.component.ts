import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'timeline-card',
  standalone: true,
  imports: [
    CardModule,
    BadgeModule,
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './timeline-card.component.html',
  styleUrl: './timeline-card.component.scss'
})
export class TimelineCardComponent {

  @Input() heading: string;
  @Input() subheading: string;
  @Input() content: string;
  @Input() bulletPoints?: string[];

  @Input() type: "light" | "dark" = "light";

  @Input() styleClass: string = "";

  cardStyleClass: string;

  ngAfterContentInit() {
    this.cardStyleClass = this.type === 'light'? 'timeline-card-light' : 'timeline-card-dark';
    if (this.styleClass.length > 0) {
      this.cardStyleClass += " " + this.styleClass;
    }
  }

}
