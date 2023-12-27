import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, HostListener,
  Input,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {SkillCategory} from "../../data/model";
import {NgForOf} from "@angular/common";
import {SkillsCard4Component} from "../skills-card-4/skills-card-4.component";

@Component({
  selector: 'skills-card',
  standalone: true,
  imports: [
    NgForOf,
    SkillsCard4Component
  ],
  templateUrl: './skills-card.component.html',
  styleUrl: './skills-card.component.scss',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsCardComponent {

  @Input() category: SkillCategory;

  @ViewChild("container", {read: ElementRef}) containerElement: ElementRef;
  @ViewChild("category_container", {read: ElementRef}) categoryContainer: ElementRef;
  @ViewChild("title", {read: ElementRef}) titleElement: ElementRef;
  @ViewChild("skills_container", {read: ElementRef}) skillsContainer: ElementRef;
  @ViewChildren("skills", {read: ElementRef}) skillCards: QueryList<ElementRef>;

  skillsMaxWidth: number;
  skillCardsWidthSum: number;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.calcSkillsMaxWidth();
    this.calcSkillCardsWidthSum();
    this.adjustSkillsWidth();
    this.shrinkTitle();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.calcSkillsMaxWidth();
    this.calcSkillCardsWidthSum()
    this.adjustSkillsWidth();
    this.shrinkTitle();
  }

  toggleCardRotation(event: MouseEvent) {
    console.log(event.target)
    this.renderer.addClass(event.target, "card-turned");
  }

  calcSkillsMaxWidth() {
    this.skillsMaxWidth = parseFloat(getComputedStyle(this.containerElement.nativeElement).width)
      - parseFloat(getComputedStyle(this.containerElement.nativeElement).padding) * 2
      - parseFloat(getComputedStyle(this.containerElement.nativeElement).gap)
      - parseFloat(getComputedStyle(this.categoryContainer.nativeElement).width);
  }

  calcSkillCardsWidthSum() {
    this.skillCardsWidthSum = 0;
    this.skillCards.forEach(skillCard => {
      this.skillCardsWidthSum += parseFloat(getComputedStyle(skillCard.nativeElement).width);
    })
  }

  adjustSkillsWidth() {
    // console.log("widths: ", this.skillsContainer.nativeElement.clientWidth, this.skillsMaxWidth, this.skillCardsWidthSum)
    if (this.skillCardsWidthSum > this.skillsMaxWidth) {
      const overflow = this.skillCardsWidthSum - this.skillsMaxWidth;
      const cardWidth = parseFloat(getComputedStyle(this.skillCards.first.nativeElement).width);
      const minNegMargin = 0.2 * cardWidth;
      const maxNegMargin = 0.6 * cardWidth;
      const margins = this.assignNegativeMargin(overflow, this.skillCards.length, minNegMargin, maxNegMargin);
      let i = 0;
      this.skillCards.forEach(skillCard => {
        this.renderer.setStyle(skillCard.nativeElement, "margin-left", margins[i] + "px")
        i++;
      })
    }
  }

  assignNegativeMargin(totalOverflow: number, numberElements: number, minNegMargin: number, maxNegMargin: number): number[] {
    let result = [0];
    const minMaxDiff = maxNegMargin - minNegMargin;
    for (let i = 0; i < numberElements - 1; i++) {
      const proportion = (i / (numberElements - 2));
      result.push( - (minNegMargin + minMaxDiff * proportion));
    }
    const sum = result.reduce((partialSum, a) => partialSum + a, 0);
    const overflowFactor = totalOverflow / -sum;
    result = result.map(margin => margin * overflowFactor);
    return result;
  }

  /**
   * Shrinks the title in case it overflows
   */
  shrinkTitle() {
    const startFontSize = parseFloat(getComputedStyle(this.titleElement.nativeElement).fontSize);
      let fontSize = startFontSize;
      while (this.titleElement.nativeElement.scrollWidth !== this.titleElement.nativeElement.clientWidth //
              && (startFontSize / 3 * 2) < fontSize) {
        fontSize -= 1;
        this.renderer.setStyle(this.titleElement.nativeElement, "font-size", fontSize + "px")
      }
  }

}
