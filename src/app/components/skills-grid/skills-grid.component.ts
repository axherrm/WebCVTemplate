import {Component, Input} from '@angular/core';
import {SkillCategory} from "../../data/model";
import {NgForOf} from "@angular/common";
import {SkillCard3Component} from "../skill-card-3/skill-card-3.component";

@Component({
  selector: 'skills-grid',
  standalone: true,
  imports: [
    NgForOf,
    SkillCard3Component
  ],
  templateUrl: './skills-grid.component.html',
  styleUrl: './skills-grid.component.scss'
})
export class SkillsGridComponent {

  @Input() category: SkillCategory;

}
