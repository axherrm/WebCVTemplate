import { Component } from '@angular/core';
import {appVersion} from "../../js/global.vars";

@Component({
  selector: 'footer-section',
  standalone: true,
  imports: [],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.scss'
})
export class FooterSectionComponent {

  protected readonly appVersion = appVersion;
}
