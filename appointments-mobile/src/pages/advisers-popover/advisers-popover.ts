import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Adviser } from "../../shared/models/Adviser";
import { AdviserService } from "../../shared/services/AdviserService";

/*
  Generated class for the AdvisersPopover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-advisers-popover',
  templateUrl: 'advisers-popover.html'
})
export class AdvisersPopoverPage {

  advisers: Array<Adviser>;
  advisersModel: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private adviserService: AdviserService) {
    this.advisers = this.adviserService.advisers;
    this.createChecklist();
  }

  createChecklist() {
    this.advisersModel = new Array<any>();
    for (let adviser of this.advisers) {

      var item = {
        fullName: adviser.fullName,
        id: adviser.id,
        checked: false
      }

      var idx = this.adviserService.selectedAdvisers.findIndex(x => x == adviser.id);
      if (idx > -1) {
        item.checked = true;
      }

      this.advisersModel.push(item);
    }
  }

  getSelectedLength(): number {
    let count = 0;
    for (let item of this.advisersModel) {
      if (item.checked) {
        count++;
      }
    }
    return count;
  }

  finish() {
    let selectedValues: Array<number> = new Array<number>();
    for (let item of this.advisersModel) {
      if (item.checked) {
        selectedValues.push(item.id);
      }
    }

    this.adviserService.selectedAdvisers = selectedValues;
    console.log(selectedValues);
    this.viewCtrl.dismiss(true);
  }

}
