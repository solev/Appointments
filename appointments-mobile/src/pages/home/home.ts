import { Component } from '@angular/core';
import { UserService } from '../../shared/services/UserService'
import { NavController, App } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome'
import { AppointmentsPage } from "../appointments/appointments";
import { MessagesPage } from "../messages/messages";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private userService: UserService, private app: App) {
    
  }

  goToAppointments(){
    this.navCtrl.push(AppointmentsPage);
  }

  goToMessages(){
    this.navCtrl.push(MessagesPage);
  }

}
