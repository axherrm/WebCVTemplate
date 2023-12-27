import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {SkillCategory} from "../../data/model";
import {CardModule} from "primeng/card";
import {SharedModule} from "primeng/api";
import {SkillCardComponent} from "../skill-card/skill-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'skill-cat-card-2',
  standalone: true,
  imports: [
    CardModule,
    SharedModule,
    SkillCardComponent,
    NgForOf
  ],
  templateUrl: './skill-cat-card-2.component.html',
  styleUrl: './skill-cat-card-2.component.scss'
})
export class SkillCatCard2Component {

  @Input() category: SkillCategory;

  @ViewChild("skill_card_container", {read: ElementRef}) flexContainer: ElementRef;

  gap: number = 15;

  ngAfterViewInit() {
    this.setWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setWidth();
  }

  setWidth() {
    const childCount = this.category.skills.length;
    // @ts-ignore
    const childHeight = document.querySelector("skill-card").clientHeight + this.gap;
    // @ts-ignore
    const childWidth = document.querySelector("skill-card").clientWidth;
    const maxContainerHeight = parseFloat(getComputedStyle(this.flexContainer.nativeElement).maxHeight);
    const rows = Math.floor(maxContainerHeight / childHeight);
    const columns = Math.ceil(childCount / rows);
    const maxContainerWidth = childWidth * columns + this.gap * (columns + 1);
    this.flexContainer.nativeElement.style.width = `${maxContainerWidth}px`;
  }

}
