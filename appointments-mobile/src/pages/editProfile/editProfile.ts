import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Camera } from 'ionic-native';
import { User } from "../../shared/models/User";
import { UserService } from "../../shared/services/UserService";

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editProfile',
  templateUrl: 'editProfile.html'
})
export class EditProfilePage {

  isReadyToSave: boolean;

  item: any;

  user: User;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private loadingCtrl: LoadingController, private userService: UserService, public toastCtrl: ToastController) {
    this.user = userService._user;
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss(false);
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    let loader = this.loadingCtrl.create({
      content: "Updating..."
    });
    loader.present();

    this.userService.updateUserInfo(this.user).subscribe(res => {
      loader.dismiss();
      this.viewCtrl.dismiss(true);
    }, error => {
      console.log(error);
    });
  }



}
