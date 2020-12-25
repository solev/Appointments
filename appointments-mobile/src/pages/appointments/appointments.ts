import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, LoadingController } from 'ionic-angular';
import { SettingService } from "../../shared/services/SettingService";
import { DatesPopoverPage } from "../dates-popover/dates-popover";
import { AdviserService } from "../../shared/services/AdviserService";
import { Adviser } from "../../shared/models/Adviser";
import { AdvisersPopoverPage } from "../advisers-popover/advisers-popover";
import { Calendar } from '@ionic-native/calendar';
import { Slot } from "../../shared/models/Slot";

/*
  Generated class for the Appointments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html'
})
export class AppointmentsPage {

  times: Array<string>; //Times column
  availableDates: Date[]; // dates that are available for selection
  selectedDate: Date; // Date selected from the select popover
  startingTime: Date; // The current time that is acting as starting time for the current visible time span (ex. 12:00-13:00) - will hold 12:00
  advisers: Array<Adviser>; // the available advisers for selection
  displayAdvisers: Array<Adviser>; // the advisers that are displayed on the screen grid (max 3)

  startTime: Date; // Setting set in the admin panel that indicates what time is the beginning of the day for slots
  endTime: Date // Setting set on the admin panel that indicates what time the day ends for slots

  availableColor: string; // color setting for the available slots
  withheldColor: string;// color setting for the whithheld slots
  bookedColor: string;// color setting for the booked slots
  notAvailableColor: string;// color setting for the not available slots

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private adviserService: AdviserService, private settingService: SettingService,
    private popoverController: PopoverController, private alertController: AlertController,
    private loadingCtrl: LoadingController) {

    this.availableDates = new Array<Date>();

    this.startTime = new Date(new Date().toDateString() + " " + this.settingService.startTime);
    this.endTime = new Date(new Date().toDateString() + " " + this.settingService.endTime);

    console.log(this.endTime);

    this.availableColor = this.settingService.availableColor;
    this.withheldColor = this.settingService.withheldColor;
    this.bookedColor = this.settingService.bookedColor;
    this.notAvailableColor = this.settingService.notAvailableColor;

    let today = new Date();
    this.selectedDate = today;
    this.availableDates.push(today);

    let advanceDays = settingService.daysInAdvance;
    for (let i = 1; i <= advanceDays; i++) {
      let dateToAdd = new Date();
      dateToAdd.setDate(today.getDate() + i);
      this.availableDates.push(dateToAdd);
    }

    this.advisers = this.adviserService.advisers;
    this.displayAdvisers = new Array<Adviser>();

    if (this.advisers.length == 0) {
      var loader = this.loadingCtrl.create();
      loader.present();
      this.adviserService.getAdvisers().subscribe(res => {
        this.advisers = this.adviserService.advisers;
        this.filterDisplayAdvisers();
        loader.dismiss();
        this.startDay();
      });

    }
    else {
      this.filterDisplayAdvisers();
      this.startDay();
    }

    this.adviserService.advisersChanged.subscribe(() => {
      this.advisers = this.adviserService.advisers;
      this.filterDisplayAdvisers();
    });
  }

  getSlotValue(adviser: Adviser, time: string) {
    var slot = adviser.slotMaps.get(time);
    if (slot) {
      return slot.adviserId;
    }
    return null;
  }

  getSlotColor(adviser: Adviser, time: string) {
    var slot = adviser.slotMaps.get(time);

    if (slot) {
      switch (slot.status) {
        case 2:
          return this.withheldColor;
        case 3:
          return this.bookedColor;
        case 4:
          return this.notAvailableColor;
      }
    }
    else {
      return this.availableColor;
    }

    return null;
  }

  requestAppointment(adviser: Adviser, time: string) {

    var isToday = new Date().getDate() == this.selectedDate.getDate();

    var subtitle = isToday ? "Today: " : "";
    subtitle += this.selectedDate.toUTCString().replace('T', ' ').substr(0, 17);

    var message = adviser.fullName + " \r\n" + time;

    var loader = this.loadingCtrl.create();
    loader.present();

    var slotDateTime = this.selectedDate.toDateString() + " " + time;
    this.adviserService.holdSlot(adviser.id, slotDateTime).subscribe(res => {
      console.log(res);
      var slot = res.result;
      loader.dismiss();

      if (res.success) {
        var alert = this.alertController.create({
          title: 'Appointment being held',
          subTitle: subtitle,
          message: message,
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                console.log("Make the appointment");
                this.adviserService.createAppointment(slot).subscribe(res => {

                  // if (this.calendar.hasWritePermission()) {
                  //   this.createCalendarAppointment(slot, adviser);
                  // }
                  // else {
                  //   this.calendar.requestWritePermission().then(() => {
                  //     this.createCalendarAppointment(slot, adviser);
                  //   })
                  // }

                })
              }
            },
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                console.log("Releasing slot");
                this.adviserService.releaseSlot(slot).subscribe(res => {
                });
              }
            }
          ]
        });

        alert.present();

        setTimeout(function () {
          alert.dismiss();
        }, this.settingService.holdTime * 1000);
      }
      else {
        var alert = this.alertController.create({
          title: 'Warning',
          message: 'Sorry, the slot is not available at the moment',
          buttons: ['OK']
        });
        alert.present();
      }

    });
  }

  createCalendarAppointment(slot: Slot, adviser: Adviser) {
    console.log(slot);
    // this.calendar.createEventWithOptions("Appointment " + adviser.fullName, null, null, new Date(slot.formattedDate), new Date(slot.formattedDate), {
    //   firstReminderMinutes: 30
    // }).then(function () {
    //   var alert = this.alertController.create({
    //     title: 'Calendar event',
    //     message: 'The appointment was successfully added to your Calendar',
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // });
  }

  getSlots() {
    var today = new Date(this.selectedDate);
    var startTime = this.times[0];
    var endTime = this.times[this.times.length - 1];

    var dateFrom = today.toDateString() + " " + startTime;
    var dateTo = today.toDateString() + " " + endTime;

    var loader = this.loadingCtrl.create();
    loader.present();

    this.adviserService.getSlots(dateFrom, dateTo).subscribe(res => {
      loader.dismiss();
    });
  }

  presentDates(ev) {

    let popover = this.popoverController.create(DatesPopoverPage, {
      dates: this.availableDates,
      selectedDate: this.selectedDate
    });

    popover.present({
      ev: ev
    });

    popover.onDidDismiss(data => {
      if (data)
        this.setSelectedDate(data);
    });
  }

  presentAdvisers(ev) {
    let popover = this.popoverController.create(AdvisersPopoverPage);

    popover.present({
      ev: ev
    });

    popover.onDidDismiss(data => {
      if (data) {
        this.getSlots();
      }

    });
  }

  setSelectedDate(date: Date) {
    this.selectedDate = new Date(date);
    this.startDay();
  }

  filterDisplayAdvisers() {
    let selected = this.adviserService.selectedAdvisers;
    this.displayAdvisers = new Array<Adviser>();
    for (let adviser of this.advisers) {
      let idx = selected.findIndex(x => x == adviser.id);
      if (idx > -1) {
        this.displayAdvisers.push(adviser);
      }
    }
  }

  roundTime(date: Date): Date {
    var min = date.getMinutes();
    if (min % 10 > 0) {
      date.setMinutes(date.getMinutes() + (10 - (min % 10)));
    }

    return date;
  }

  startDay() {
    let today = new Date();
    let selected = new Date(this.selectedDate);

    if (today.getDay() == selected.getDay()) {
      if (today.getTime() < this.startTime.getTime()) {
        today.setTime(this.startTime.getTime());
      }
      else {
        today = this.roundTime(today);
      }
    }
    else {
      today = new Date(this.selectedDate);
      today.setTime(this.startTime.getTime());
    }

    this.startingTime = today;
    this.generateTimes();
  }

  laterHours(hours: number) {
    var startingHour = this.startingTime.getHours();

    if (!this.canGoLater(hours))
      return;

    this.startingTime.setHours(this.startingTime.getHours() + hours);
    this.startingTime.setMinutes(0);
    this.generateTimes();
  }

  endDay() {
    var today = new Date();

    if (today.getDate() == this.selectedDate.getDate()) {
      if (today.getHours() >= this.endTime.getHours()) {
        return;
      }

      today.setHours(this.endTime.getHours());
      today.setMinutes(0);
    }
    else {
      today = new Date(this.selectedDate);
      today.setHours(this.endTime.getHours());
      today.setMinutes(0);
    }

    this.startingTime = today;
    this.generateTimes();
  }

  earlierHours(hours: number) {
    var startingHour = this.startingTime.getHours();

    if (!this.canGoEarlier(hours))
      return;

    var today = new Date();
    var subtHours = startingHour - hours;
    if (subtHours == today.getHours() || subtHours <= this.startTime.getHours())
      this.startDay();
    else {
      this.startingTime.setHours(this.startingTime.getHours() - hours);
      this.startingTime.setMinutes(0);
      this.generateTimes();
    }

  }

  generateTimes() {

    this.times = new Array<string>();
    var today = new Date(this.startingTime);

    this.times.push(this.getFormattedTime(today));

    while (true) {
      today.setMinutes(today.getMinutes() + 10);
      this.times.push(this.getFormattedTime(today));

      if (today.getMinutes() == 0 || (today.getHours() == this.endTime.getHours() && today.getMinutes() == this.endTime.getMinutes())) {
        break;
      }

    }

    this.getSlots();
  }



  canGoEarlier(hours: number): boolean {
    if (this.startingTime) {
      var startingHour = this.startingTime.getHours();

      var currentHour = new Date().getHours();

      if (currentHour < this.startTime.getHours()) {
        currentHour = this.startTime.getHours();
      }

      return startingHour - hours >= currentHour;
    }

    return false;
  }

  canGoLater(hours: number): boolean {
    if (this.startingTime) {
      var startingHour = this.startingTime.getHours();
      return startingHour + hours <= this.endTime.getHours();
    }

    return false;
  }

  getFormattedTime(date: Date) {
    return ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
  }

  getFormattedDate(date: Date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return dayNames[date.getDay()]+", "+monthNames[date.getMonth()] + " "+date.getDate()+", "+date.getFullYear();
  }

}