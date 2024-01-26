import {Component, Input} from '@angular/core';
import {AboutCardComponent} from "../../components/about-card/about-card.component";
import {AboutCard, LanguagePack} from "../../data/model";
import {appName, appVersion, githubURL} from "../../js/global.vars";
import {BadgeModule} from "primeng/badge";
import {BadgeComponent} from "../../components/badge/badge.component";
import {NgForOf, NgIf} from "@angular/common";
import {CustomButtonComponent} from "../../components/custom-button/custom-button.component";

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

  @Input({required: true}) content: AboutCard[];
  @Input({required: true}) langPack: LanguagePack;

  appVersion: string = appVersion;
  appName: string = appName;
  githubURL: string = githubURL;

}
