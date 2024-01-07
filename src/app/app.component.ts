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

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TimelineModule, CardModule, ButtonModule, BadgeModule, SpeedDialModule, TimelineCardComponent, HeadingCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild("background", {read: ElementRef}) background: ElementRef;
  @ViewChild("education_card", {read: ElementRef}) educationCard: ElementRef;
  @ViewChild("lang_selector", {read: ElementRef}) langSelector: ElementRef;

  dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  ngAfterViewInit(): void {
    this.addLangButtonAnimation();
    // this.addAlarmClockAnimation(this.educationCard.nativeElement.children[0]);
    // @ts-ignore
    for (let el of document.getElementsByClassName("alarm-clock-animated")) {
      this.addAlarmClockAnimation(el);
    }
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
}
