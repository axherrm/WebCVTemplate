import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'skill-card',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SkillCardComponent {

  @Input() name: string;
  @Input() description: string;
  @Input() rating: number;

  rotated: boolean = false;

}
