import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild} from '@angular/core';
import {CardModule} from "primeng/card";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'skill-card3',
  standalone: true,
  imports: [
    CardModule,
    SharedModule
  ],
  templateUrl: './skill-card-3.component.html',
  styleUrl: './skill-card-3.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillCard3Component {

  @Input() name: string;
  @Input() percent: number;
  @Input() description: string;

}
