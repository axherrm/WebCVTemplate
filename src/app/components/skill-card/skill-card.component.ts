import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild} from '@angular/core';
import {CardModule} from "primeng/card";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'skill-card',
  standalone: true,
  imports: [
    CardModule,
    SharedModule
  ],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillCardComponent {

  @Input() name: string;
  @Input() percent: number;
  @Input() description: string;

}
