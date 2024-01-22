import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {NavbarDotComponent} from "../../components/navbar-dot/navbar-dot.component";
import {NgForOf} from "@angular/common";
import {SpeedDialModule} from "primeng/speeddial";
import {Section} from "../../data/model";
import {MenuItem} from "primeng/api";
import {ScrollTrigger} from "gsap/ScrollTrigger";

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [
    NavbarDotComponent,
    NgForOf,
    SpeedDialModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input({required: true}) sections: Section[];
  @Input({required: true}) languagesMenuItems: MenuItem[];

  // @Output() hovered: boolean = false;

  @ViewChildren("navbar_dot", {read: NavbarDotComponent}) dots: QueryList<NavbarDotComponent>;

  sectionActive = 0;

  changeDetectorRef: ChangeDetectorRef;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }

  ngAfterViewInit(): void {
    this.addSelectedAnimation();
  }

  // @HostListener("mouseleave")
  // onMouseleave() {
  //   this.hovered = false;
  // }

  addSelectedAnimation() {
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      ScrollTrigger.create({
        start: "top 50%",
        trigger: `#${section.id}`,
        end: "+=1",
        // markers: true,
        onEnter: self => {
          console.log("Active section is ", i, "onEnter");
          this.sectionActive = i;
          this.changeDetectorRef.detectChanges();
        },
        onEnterBack: self => {
          console.log("Active section is ", i-1, "onEnterBack");
          this.sectionActive = i-1;
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }
}
