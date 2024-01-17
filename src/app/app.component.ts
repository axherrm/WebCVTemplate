import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TimelineModule} from 'primeng/timeline';
import {BadgeModule} from "primeng/badge";
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DataService} from "./data/data.service";
import {SpeedDialModule} from "primeng/speeddial";
import {OverlayPanelModule} from "primeng/overlaypanel";
import 'js-circle-progress';
import {TimelineCardComponent} from "./components/timeline-card/timeline-card.component";
import {HeadingCardComponent} from "./components/heading-card/heading-card.component";
import {SkillsCardComponent} from "./components/skills-card/skills-card.component";

gsap.registerPlugin(ScrollTrigger);

import "./js/lenis.js";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    TimelineModule,
    BadgeModule,
    SpeedDialModule,
    OverlayPanelModule,
    // Custom
    TimelineCardComponent,
    HeadingCardComponent,
    SkillsCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild("background", {read: ElementRef}) background: ElementRef;
  @ViewChild("outest_container", {read: ElementRef}) outestContainer: ElementRef;
  @ViewChild("progress_bar", {read: ElementRef}) progressBar: ElementRef;
  @ViewChild("education_card", {read: ElementRef}) educationCard: ElementRef;
  @ViewChild("lang_selector", {read: ElementRef}) langSelector: ElementRef;

  dataService: DataService;

  alarmClockTimelines: gsap.core.Timeline[] = [];

  constructor(dataService: DataService) {
    this.dataService = dataService;
    this.dataService.langChange.subscribe(() => this.onLangChange());
  }

  ngAfterViewInit(): void {
    this.addLangButtonAnimation();
    this.addProgressBarAnimation();
    // @ts-ignore
    for (let el of document.getElementsByClassName("alarm-clock-animated")) {
      this.addAlarmClockAnimation(el);
    }
  }

  onLangChange() {
    this.alarmClockTimelines.forEach(tl => tl.kill());
    this.alarmClockTimelines = [];

    let objectsToAnimate = document.getElementsByClassName("alarm-clock-animated");
    // @ts-ignore
    for (let el of objectsToAnimate) {
      this.addAlarmClockAnimation(el);
    }
  }

  addProgressBarAnimation() {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "top top",
        trigger: this.outestContainer.nativeElement,
        end: "bottom bottom",
        scrub: true,
      }
    });
    tl.fromTo(this.progressBar.nativeElement, {
      transform: "scaleX(0)"
    }, {
      transform: "scaleX(1)"
    })
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
    this.alarmClockTimelines.push(bottomHalfTl, upperHalfTl);
  }

}
