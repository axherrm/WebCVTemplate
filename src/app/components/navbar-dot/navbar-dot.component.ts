import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {Section} from "../../data/model";
import gsap from "gsap";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin)

@Component({
  selector: 'navbar-dot',
  standalone: true,
  imports: [],
  templateUrl: './navbar-dot.component.html',
  styleUrl: './navbar-dot.component.scss'
})
export class NavbarDotComponent {

  @Input({required: true}) section: Section;

  // @HostBinding('class.extended')
  // @Input()
  // extended = false;

  @HostBinding('class.active')
  @Input()
  active = false;

  // @Output() hover: EventEmitter<void> = new EventEmitter<void>();

  delayTimeout: any;

  // @HostListener("mouseenter")
  // onMouseover() {
  //   this.delayTimeout = setTimeout(() => this.hover.emit(), 300);
  // }

  /**
   * In case the hovering stops before delay timeout is over, the hovering is not forwarded.
   */
  // @HostListener("mouseleave")
  // onMouseleave() {
  //   clearTimeout(this.delayTimeout);
  // }

  @HostListener("click")
  onClick() {
    gsap.to(window, {
      duration: 2,
      scrollTo: {
        y: `#${this.section.id}`,
        offsetY: 20,
      },
      ease: "power1.inOut"
    });
  }

}
