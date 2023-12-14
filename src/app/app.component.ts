import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";


interface EducationItem {
  heading: string;
  subheading: string;
  date: string;
  content: string;
  bulletPoints?: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TimelineModule, CardModule, ButtonModule, BadgeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  education: EducationItem[];

  constructor() {
    this.education = [
      { heading: 'Grundschule', subheading: 'Berkenschule Holzgerlingen', date: '09/2008-07/2012', content: "In der Grundschule hatte ich zwar noch keine Berührungen mit Informatik oder technischen Themen, doch Mathe hat sich schenll als mein Lieblingsfach herausgestellt." },
      { heading: 'Allgemeine Hochschulreife', subheading: 'Schönbuch-Gymnasium Holzgerlingen', date: '09/2012-07/2020', bulletPoints: ["Abschlussnote: 1,4"], content: "Neben der allgemeinen Bildung habe ich hier meine ersten Erfahrungen in der Informatik sammeln können. Ab der Oberstufe habe ich Informatikunterricht besucht." },
      { heading: 'Software Engineering B.Sc.', subheading: 'Universität Stuttgart', date: '10/2020-04/2023', bulletPoints: ["Voraussichtliche Abschlussnote: 2.0"], content: "In Abgrenzung zum verwandten Studiengang Informatik konnte ich hier einige praktische Erfahrungen mehr sammeln. Diese kleinen Programmierprojekte konnten mich im Studium bisher am meisten begeistern." },
    ];
  }
}
