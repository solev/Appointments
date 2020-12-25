import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { TabsPage } from '../../pages/tabs/tabs';
import { UserService } from '../../shared/services/UserService';

import { SignupPage } from '../signup/signup';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  account: { usernameOrEmailAddress: string, password: string } = {
    usernameOrEmailAddress: 'test@example.com',
    password: 'test'
  };
  
  message: string = "";

  constructor(public navCtrl: NavController,
    public userService: UserService,    
    private loadingCtrl: LoadingController) {

  }

  doLogin() {
    this.message = "";
    let loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
    loader.present();

    this.userService.login(this.account).subscribe((resp) => {      
      loader.dismiss();
    }, (err) => {      
      loader.dismiss();    
      this.message = "Wrong username or password";  
      // Unable to log in      
    });
  }

  signup() {
    this.navCtrl.setRoot(SignupPage, null, {
      animate: true
    });
  }
  
}
