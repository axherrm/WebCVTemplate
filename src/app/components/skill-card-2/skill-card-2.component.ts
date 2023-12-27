import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {SharedModule} from "primeng/api";

@Component({
  selector: 'skill-card2',
  standalone: true,
  imports: [
    CardModule,
    SharedModule
  ],
  templateUrl: './skill-card-2.component.html',
  styleUrl: './skill-card-2.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillCardComponent2 {

  @Input() name: string;
  @Input() percent: number;
  @Input() description: string;

}
