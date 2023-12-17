import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DataService} from "./data/data.service";
import {SpeedDialModule} from "primeng/speeddial";
import {TimelineCardComponent} from "./components/timeline-card/timeline-card.component";
import {HeadingCardComponent} from "./components/heading-card/heading-card.component";
import {StepsModule} from "primeng/steps";
import {MenuItem} from "primeng/api";
import {RouterOutlet} from "@angular/router";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TimelineModule, CardModule, ButtonModule, BadgeModule, SpeedDialModule, TimelineCardComponent, HeadingCardComponent, StepsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild("background", {read: ElementRef}) background: ElementRef;
  @ViewChild("education_card", {read: ElementRef}) educationCard: ElementRef;
  @ViewChild("lang_selector", {read: ElementRef}) langSelector: ElementRef;
  @ViewChild("navbar", {read: ElementRef}) navbar: ElementRef;

  dataService: DataService;
  menuSteps: MenuItem[];
  stepActive: number = 0;

  constructor(dataService: DataService) {
    this.dataService = dataService;
    this.menuSteps = [
      {label: 'Home'},
      {label: this.dataService.languagePack.education},
      {label: this.dataService.languagePack.experience},
      {label: this.dataService.languagePack.skills},
    ];
    this.dataService.afterLanguageLoad = () => {
      this.menuSteps = [
        {label: 'Home'},
        {label: this.dataService.languagePack.education},
        {label: this.dataService.languagePack.experience},
        {label: this.dataService.languagePack.skills},
      ];
    };
  }

  ngAfterViewInit(): void {
    this.addLangButtonAnimation();
  }

  addLangButtonAnimation() {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "top 90%",
        trigger: this.educationCard.nativeElement,
        end: "top top",
        // markers: true, // TODO remove
        scrub: true,
      }
    });
    tl
      .to(this.background.nativeElement, {
        filter: "blur(2px)"
      })
      .from(this.langSelector.nativeElement, {
        opacity: 0,
        ease: "power1.in"
      }, "<")
      .from(this.navbar.nativeElement, {
        // duration: 40,
        opacity: 0,
        ease: "power1.in"
      }, "<");
  }

  onStepChange(step: number) {
    this.stepActive = step;
  }

  scrollTo() {
    // @ts-ignore
    console.log(this.educationCard.nativeElement);
    // @ts-ignore
    this.educationCard.nativeElement.scrollIntoView({behavior: "smooth"});
  }
}
