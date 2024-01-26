import {Component, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'badge',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {

  @Input() iconClass: string;
  @Input() iconRef: string;

  @Input() iconColor: string;
  @Input() @HostBinding('style.background') color: string = "linear-gradient(to right, #a445b2, #fa4299)";
  @Input() link: string;

  @ViewChild("glow", {read: ElementRef}) glow: ElementRef;

  constructor(private hostEl: ElementRef, private renderer: Renderer2) {}

  // Inspo: https://codepen.io/markmiro/pen/wbqMPa
  @HostListener('mousemove', ['$event'])
  rotateToMouse(e: any) {
    const bounds = this.hostEl.nativeElement.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    }

    this.renderer.setStyle(this.glow.nativeElement, "background-image", `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.glow.nativeElement, "background-image");
  }

}
