import { Component } from '@angular/core';
import {ChatRowComponent} from "../../components/chat-row/chat-row.component";
import {NgForOf} from "@angular/common";
import {DataService} from "../../data/data.service";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'contact',
  standalone: true,
  imports: [
    ChatRowComponent,
    NgForOf,
    InputTextareaModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor(readonly dataService: DataService) {}

}
