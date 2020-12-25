import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Message } from "../../shared/models/Message";
import { MessageService } from "../../shared/services/MessageService";

/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  message: Message;
  constructor(public navCtrl: NavController, public navParams: NavParams, private messageService: MessageService) {
    this.message = this.navParams.data.message;
    if(!this.message.isRead){
      this.messageService.markAsRead(this.message.id).subscribe(res=>{
        this.message.isRead = true;
      });
    }
  }

}
