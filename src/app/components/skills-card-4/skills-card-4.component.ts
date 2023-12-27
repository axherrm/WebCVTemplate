import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'skills-card-4',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './skills-card-4.component.html',
  styleUrl: './skills-card-4.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SkillsCard4Component {

  @Input() name: string;
  @Input() description: string;
  @Input() rating: number;

  rotated: boolean = false;

}
