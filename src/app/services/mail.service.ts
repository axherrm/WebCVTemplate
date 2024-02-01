import {Injectable} from '@angular/core';
import emailjs from '@emailjs/browser';
import {DataService} from "../data/data.service";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(readonly dataService: DataService) {}

  /**
   * Sends the given message via configured mail settings and invokes appropriate callback function
   * @param message
   * @param onSuccess
   * @param onFail
   */
  async sendMail(message: string, onSuccess: () => void, onFail: () => void) {
    emailjs.send(this.dataService.mailSettings.serviceId, this.dataService.mailSettings.templateId, {
      message: message,
      host: location.host
    }, this.dataService.mailSettings.publicKey)
      .then(response => {
        console.log("Sent message successfully", response.status, response.text);
        onSuccess();
      }, error => {
        console.error("Sending message failed", error);
        onFail();
      });
  }
}
