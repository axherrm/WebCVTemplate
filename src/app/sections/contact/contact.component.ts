import {ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {ChatRowComponent} from "../../components/chat-row/chat-row.component";
import {NgForOf} from "@angular/common";
import {DataService} from "../../data/data.service";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MailService} from "../../services/mail.service";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SocialMediaCardComponent} from "../../components/social-media-card/social-media-card.component";

gsap.registerPlugin(ScrollTrigger);

interface Message {
  text: string;
  side: "left" | "right";
  sent: boolean;
}

@Component({
  selector: 'contact',
  standalone: true,
  imports: [
    ChatRowComponent,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    SocialMediaCardComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  @ViewChild("chat_input", {read: ElementRef}) chatInputEl: ElementRef<HTMLTextAreaElement>;
  @ViewChild("social_media_container", {read: ElementRef}) socialMediaContainer: ElementRef<HTMLDivElement>;
  @ViewChild("spacer", {read: ElementRef}) spacer: ElementRef<HTMLDivElement>;

  messages: Message[] = [];
  messagesSent: number = 0;

  text: FormControl<string|null> = new FormControl<string>("", [Validators.required]);

  protected readonly noop = Function;

  constructor(readonly dataService: DataService,
              readonly renderer2: Renderer2,
              readonly mailService: MailService,
              readonly host: ElementRef,
              readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    ScrollTrigger.create({
      trigger: this.host.nativeElement,
      start: "top 80%",
      onEnter: () => this.showOwnMessages(this.dataService.contact.conversationStart),
      once: true
    })
    this.text.valueChanges.subscribe(() => this.resizeChatInput());
    this.adjustSpacing();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustSpacing();
  }

  adjustSpacing() {
    const lastElementHeight = this.socialMediaContainer.nativeElement.clientHeight;
    this.renderer2.setStyle(this.spacer.nativeElement, "height", `calc((100vh - ${lastElementHeight}px) / 2 - 2rem)`);
  }

  /**
   * Resizes chat input field whenever a new character is inserted to the textarea
   */
  resizeChatInput() {
    this.renderer2.setStyle(this.chatInputEl.nativeElement, "height", "auto");
    if (this.chatInputEl.nativeElement.scrollHeight !== this.chatInputEl.nativeElement.clientHeight) {
      this.renderer2.setStyle(this.chatInputEl.nativeElement,
        "height", this.chatInputEl.nativeElement.scrollHeight + "px");
    }
    ScrollTrigger.refresh();
  }

  /**
   * Called whenever the user wants to send the message.
   * Content of textarea gets displayed as new message of the user.
   * If delivery of the message via mail successes, the message gets restyled.
   * Also triggers responses (for first successful message, failed messages and spam protection).
   */
  sendMessage() {
    if (!this.text.value || this.text.invalid) { return; }

    const text = this.text.value.replaceAll(/\n/g, "<br />");
    const newMessage: Message = {text: text, side: "right", sent: false};
    this.messages.push(newMessage);
    ScrollTrigger.refresh();
    if (this.messagesSent < 5) {
      this.mailService.sendMail(text,
        () => {
          newMessage.sent = true;
          if (this.messagesSent === 0) {
            this.showOwnMessages(this.dataService.contact.successMessages);
          }
          this.messagesSent++;
        }, () => {
          this.showOwnMessages(this.dataService.contact.failedMessages);
        }
      )
    } else {
      this.showOwnMessages(this.dataService.contact.tooManyMessages);
    }
    this.text.reset();
  }

  /**
   * Displays messages of the website owner on the left side of the chat.
   * Adds delay for multiple messages as configured in mail settings.
   * @param messages
   */
  showOwnMessages(messages: string[]) {
    let totalDelay = 0;
    for (let message of messages) {
      setTimeout(() => {
        this.messages.push({side: "left", sent: true, text: message});
        this.changeDetectorRef.detectChanges();
        ScrollTrigger.refresh();
      }, totalDelay);
      totalDelay += this.dataService.mailSettings.ownMessageDelay;
    }
  }
}
