import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DataService} from "./data/data.service";
import {SpeedDialModule} from "primeng/speeddial";
import {OverlayPanelModule} from "primeng/overlaypanel";
import 'js-circle-progress';
import {SkillCardComponent} from "./components/skill-card/skill-card.component";
import {SkillCardComponent2} from "./components/skill-card-2/skill-card-2.component";
import {SkillCatCardComponent} from "./components/skill-cat-card/skill-cat-card.component";
import {TimelineCardComponent} from "./components/timeline-card/timeline-card.component";
import {HeadingCardComponent} from "./components/heading-card/heading-card.component";
import {SkillCatCard2Component} from "./components/skill-cat-card-2/skill-cat-card-2.component";
import {SkillsGridComponent} from "./components/skills-grid/skills-grid.component";
import {SkillsCardComponent} from "./components/skills-card/skills-card.component";

gsap.registerPlugin(ScrollTrigger);

import "./js/lenis.js";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TimelineModule, CardModule, ButtonModule, BadgeModule, SpeedDialModule, OverlayPanelModule, SkillCardComponent, SkillCatCardComponent, SkillCardComponent2, TimelineCardComponent, HeadingCardComponent, SkillCatCard2Component, SkillsGridComponent, SkillsCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {

  @ViewChild("background", {read: ElementRef}) background: ElementRef;
  @ViewChild("education_card", {read: ElementRef}) educationCard: ElementRef;
  @ViewChild("lang_selector", {read: ElementRef}) langSelector: ElementRef;
  @ViewChild("skills_section", {read: ElementRef}) skillsSection: ElementRef;
  @ViewChild("skills_container", {read: ElementRef}) skillsContainer: ElementRef;

  dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  ngAfterViewInit(): void {
    this.addLangButtonAnimation();
    // @ts-ignore
    for (let el of document.getElementsByClassName("alarm-clock-animated")) {
      this.addAlarmClockAnimation(el);
    }
    this.addSkillsAnimation();
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
      }, "<");
  }

  addAlarmClockAnimation(el: HTMLElement) {
    const bottomHalfTl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "top bottom",
        trigger: el,
        end: "center center",
        // markers: true, // TODO remove
        scrub: true,
      },
      defaults: {
        ease: "power1.out"
      }
    });
    const upperHalfTl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "center center",
        trigger: el,
        end: "bottom top",
        // markers: true, // TODO remove
        scrub: true,
      },
      defaults: {
        ease: "power1.in"
      }
    });
    bottomHalfTl.fromTo(el, {
      scale: 0.9,
      filter: "brightness(0.8)",
      rotationX: "-30deg",
      transformPerspective: "1400px",
    }, {
      scale: 1,
      filter: "brightness(1)",
      rotationX: "0deg",
      transformPerspective: "1000px",
    });
    upperHalfTl.to(el, {
      scale: 0.9,
      filter: "brightness(0.8)",
      rotationX: "30deg",
      transformPerspective: "1400px",
    })
  }

  addSkillsAnimation(): void {
    let containerWidth = (this.skillsContainer.nativeElement.children.length - 1) * 0.1 * document.documentElement.clientWidth;
    for (let child of this.skillsContainer.nativeElement.children) {
      containerWidth += child.scrollWidth;
    }
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.skillsSection.nativeElement,
        start: "top 5%",
        endTrigger: this.skillsContainer.nativeElement,
        end: "right top",
        pin: this.skillsSection.nativeElement,
        // markers: true, // TODO remove
        scrub: true,
      }
    });
    tl.fromTo(this.skillsContainer.nativeElement, {
      x: containerWidth / 2 + 0.5 * document.documentElement.clientWidth
    }, {
      x: -1 * (containerWidth / 2) + 0.45 * document.documentElement.clientWidth
    })
  }
}
