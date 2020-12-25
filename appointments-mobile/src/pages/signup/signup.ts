import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { TabsPage } from '../../pages/tabs/tabs';
import { UserService } from '../../shared/services/UserService';
import { WelcomePage } from '../../pages/welcome/welcome'
import { RegisterModel } from "../../shared/models/RegisterModel";



/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: RegisterModel;
  message: string;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public userService: UserService,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.account = new RegisterModel();
  }

  doSignup() {

    if (this.account.password != this.account.confirmPassword) {
       let alert = this.alertCtrl.create({
            title: 'Failed',
            subTitle: "Passwords dont match!",
            buttons: ['OK']
          });
          alert.present();
          return;
    }

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    // Attempt to login in through our User service
    this.userService.signup(this.account)
      .map(res => res.json())
      .subscribe((resp) => {
        console.log(resp);
        let errorMsg = "";
        if (resp.error) {
          errorMsg = resp.error.message;
          let alert = this.alertCtrl.create({
            title: 'Failed',
            subTitle: errorMsg,
            buttons: ['OK']
          });
          alert.present();
        }
        loader.dismiss();
      }, (err) => {
        loader.dismiss();
      });
  }

  login() {
    this.navCtrl.setRoot(WelcomePage, null, {
      animate: true
    });
  }
}
