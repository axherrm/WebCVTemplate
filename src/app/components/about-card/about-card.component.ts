import {Component, ElementRef, HostBinding, Input, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {AboutCard, LanguagePack} from "../../data/model";
import {ScrollTrigger} from "gsap/ScrollTrigger";

@Component({
  selector: 'about-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './about-card.component.html',
  styleUrl: './about-card.component.scss'
})
export class AboutCardComponent {

  @Input({required: true}) content: AboutCard;
  @Input({required: true}) langPack: LanguagePack;

  @ViewChild("text", {read: ElementRef}) textElement: ElementRef;

  @HostBinding("style.max-height") maxHeight: string = "22rem";

  extended: boolean = false;

  toggleExtension() {
    this.extended = !this.extended;
    if (this.extended) {
      const height = this.textElement.nativeElement.offsetHeight;
      this.maxHeight = `calc(4rem + ${height}px + 1px)`;
    } else {
      this.maxHeight = "22rem";
    }
    // smoothly reset GSAP markers
    for (let i = 1; i <= 40; i++) {
      setTimeout(() => ScrollTrigger.refresh(), i * 20);
    }
  }

}