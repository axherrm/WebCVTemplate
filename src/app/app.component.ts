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
import {NavbarDotComponent} from "./components/navbar-dot/navbar-dot.component";
import {SidebarComponent} from "./sections/sidebar/sidebar.component";
import {AboutCardComponent} from "./components/about-card/about-card.component";
import {AboutComponent} from "./sections/about/about.component";

gsap.registerPlugin(ScrollTrigger);

import "./js/lenis.js";
import {ContactComponent} from "./sections/contact/contact.component";
import {FooterSectionComponent} from "./sections/footer-section/footer-section.component";

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
    SkillsCardComponent,
    NavbarDotComponent,
    SidebarComponent,
    AboutCardComponent,
    AboutComponent,
    ContactComponent,
    FooterSectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild("backgroundImg", {read: ElementRef}) backgroundImage: ElementRef;
  @ViewChild("outest_container", {read: ElementRef}) outestContainer: ElementRef;
  @ViewChild("progress_bar", {read: ElementRef}) progressBar: ElementRef;
  // @ViewChild("content_container", {read: ElementRef}) contentContainer: ElementRef;
  @ViewChild("education_card", {read: ElementRef}) educationCard: ElementRef;
  @ViewChild("sidebar", {read: ElementRef}) sidebar: ElementRef;

  dataService: DataService;

  alarmClockTimelines: gsap.core.Timeline[] = [];

  constructor(dataService: DataService) {
    this.dataService = dataService;
    this.dataService.langChange.subscribe(() => this.onLangChange());
  }

  ngAfterViewInit(): void {
    this.addSidebarAnimation();
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

  addSidebarAnimation() {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "top 90%",
        trigger: this.educationCard.nativeElement,
        end: "top top",
        scrub: true,
      }
    });
    tl
      .to(this.backgroundImage.nativeElement, {
        filter: "blur(2px)"
      })
      .fromTo(this.sidebar.nativeElement, {
        opacity: 0,
        ease: "power1.in",
        display: "none"
      }, {
        display: "var(--display-side-elements-flex)",
        opacity: 1,
      }, "<");
  }

  addAlarmClockAnimation(el: HTMLElement) {
    const bottomHalfTl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: "top bottom",
        trigger: el,
        end: "center center",
        // markers: true,
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
        // markers: true,
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
