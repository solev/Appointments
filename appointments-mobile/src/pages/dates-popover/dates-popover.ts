import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the DatesPopover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dates-popover',
  templateUrl: 'dates-popover.html'
})
export class DatesPopoverPage {

  dates: Date[];
  selectedDate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.dates = this.navParams.data.dates as Date[];
    this.selectedDate = (this.navParams.data.selectedDate as Date);
  }


  changeDate() {
    if (this.selectedDate != (this.navParams.data.selectedDate as Date)) {
      this.viewCtrl.dismiss(this.selectedDate);
    }
  }

  getFormattedDate(date: Date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return dayNames[date.getDay()]+", "+monthNames[date.getMonth()] + " "+date.getDate()+", "+date.getFullYear();
  }

}
