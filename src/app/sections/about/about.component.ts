import {Component} from '@angular/core';
import {AboutCardComponent} from "../../components/about-card/about-card.component";
import {appName, appVersion, githubURL} from "../../js/global.vars";
import {BadgeModule} from "primeng/badge";
import {BadgeComponent} from "../../components/badge/badge.component";
import {NgForOf, NgIf} from "@angular/common";
import {CustomButtonComponent} from "../../components/custom-button/custom-button.component";
import {DataService} from "../../data/data.service";

@Component({
  selector: 'about',
  standalone: true,
  imports: [
    AboutCardComponent,
    BadgeModule,
    BadgeComponent,
    NgForOf,
    CustomButtonComponent,
    NgIf
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  appVersion: string = appVersion;
  appName: string = appName;
  githubURL: string = githubURL;

  constructor(readonly dataService: DataService) {}

}
