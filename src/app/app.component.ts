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

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TimelineModule, CardModule, ButtonModule, BadgeModule, SpeedDialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild("background") background: ElementRef;
  @ViewChild("education_card") educationCard: ElementRef;
  @ViewChild("lang_selector") langSelector: ElementRef;

  dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  ngAfterViewInit(): void {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        start: 200,
        trigger: this.educationCard.nativeElement,
        end: "+=1000",
        // markers: true, // TODO remove
        scrub: true,
      }
    });
    tl
      .to(this.background.nativeElement, {
        duration: 50,
        filter: "blur(2px)"
      })
      .from(this.langSelector.nativeElement, {
        duration: 20,
        // scaleX: 0,
        // x: 32,
        opacity: 0
      });
  }
}
