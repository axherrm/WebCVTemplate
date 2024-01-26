import {
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren
} from '@angular/core';
import {NavbarDotComponent} from "../../components/navbar-dot/navbar-dot.component";
import {NgForOf} from "@angular/common";
import {SpeedDialModule} from "primeng/speeddial";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {DataService} from "../../data/data.service";

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

  // @Output() hovered: boolean = false;

  @ViewChildren("navbar_dot", {read: NavbarDotComponent}) dots: QueryList<NavbarDotComponent>;

  sectionActive = 0;

  constructor(readonly changeDetectorRef: ChangeDetectorRef, readonly dataService: DataService) {}

  ngAfterViewInit(): void {
    this.addSelectedAnimation();
  }

  // @HostListener("mouseleave")
  // onMouseleave() {
  //   this.hovered = false;
  // }

  addSelectedAnimation() {
    for (let i = 0; i < this.dataService.languagePack.sections.length; i++) {
      const section = this.dataService.languagePack.sections[i];
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
