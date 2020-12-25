import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Camera } from 'ionic-native';
import { User } from "../../shared/models/User";
import { UserService } from "../../shared/services/UserService";
import { EditProfilePage } from "../editProfile/editProfile";

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user: User;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private modalCtrl: ModalController, private userService: UserService, public toastCtrl: ToastController) {
    this.user = userService._user;
    userService.userUpdated.subscribe(res => {
      this.user = res;
    })
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  edit() {
    let addModal = this.modalCtrl.create(EditProfilePage);
    addModal.onDidDismiss(res => {
      if (res) {
        let toast = this.toastCtrl.create({
          message: "Profile update successfull",
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }

    });

    addModal.present();
  }

  logout() {
    this.userService.logout();
  }

}
