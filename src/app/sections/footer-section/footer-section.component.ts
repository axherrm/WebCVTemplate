import { Component } from '@angular/core';
import {appVersion, githubURL} from "../../js/global.vars";
import {CustomButtonComponent} from "../../components/custom-button/custom-button.component";

@Component({
  selector: 'footer-section',
  standalone: true,
  imports: [
    CustomButtonComponent
  ],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.scss'
})
export class FooterSectionComponent {

  protected readonly appVersion = appVersion;
  protected readonly githubURL = githubURL;

  currentYear: string = '' + new Date().getFullYear();

}
