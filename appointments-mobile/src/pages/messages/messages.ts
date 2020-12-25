import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { MessageService } from "../../shared/services/MessageService";
import { Observable } from "rxjs/Observable";
import { Message } from "../../shared/models/Message";
import { MessagePage } from "../message/message";

/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {

  messages: Array<Message>;
  private page: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public messageService: MessageService, private loadingCtrl: LoadingController) {
    this.page = 1;
    this.messages = this.messageService.messages;
    if (this.messages.length == 0) {
      let loader = this.loadingCtrl.create();
      loader.present();
      this.messageService.getMessages(this.page).subscribe(res => {
        this.messages = this.messageService.messages;
        loader.dismiss();
      })
    }

    this.messageService.messagesChanged.subscribe(()=>{
      this.messages = this.messageService.messages;
    })
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.messageService.getMessages(this.page).subscribe(res => {
      infiniteScroll.complete();
      if (res.length <= this.messageService.msgsPerPage) {
        infiniteScroll.enable(false);
      }

      this.messages = this.messageService.messages;
    });
  }

  doRefresh(refresher) {
    this.messageService.getMessages(1, true).subscribe(res => {
      this.messages = this.messageService.messages;
      refresher.complete();
    });
  }

  openMessage(message: Message) {
    this.navCtrl.push(MessagePage, {
      message: message
    });
  }

}
