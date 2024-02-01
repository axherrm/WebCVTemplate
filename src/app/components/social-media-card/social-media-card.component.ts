import {Component, Input} from '@angular/core';
import {SocialMediaItem} from "../../data/model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'social-media-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './social-media-card.component.html',
  styleUrl: './social-media-card.component.scss'
})
export class SocialMediaCardComponent {

  @Input({required: true}) input: SocialMediaItem;

}
