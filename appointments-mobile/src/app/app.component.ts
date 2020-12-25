import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { UserService } from '../shared/services/UserService'

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { SettingService } from "../shared/services/SettingService";
import { ChannelService, ConnectionState } from "../shared/services/channel.service";
import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage = TabsPage;
  @ViewChild(Nav) nav: Nav;
  connectionState$: Observable<string>;

  constructor(platform: Platform, private userService: UserService, private settingService: SettingService, private channelService: ChannelService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.           

      this.userService.isAuthenticated().then(res => {
        StatusBar.styleDefault();
        Splashscreen.hide();

        settingService.getAllSettings();

        if (!res) {
          this.nav.setRoot(WelcomePage);
        }
        else {
          this.nav.setRoot(TabsPage);
          this.channelService.start();
        }
      });


      this.userService.authChange.subscribe(res => {
        if (res) {
          this.channelService.start();
          this.nav.setRoot(TabsPage);
        }
        else {
          this.nav.setRoot(WelcomePage);
        }
      });

      this.connectionState$ = this.channelService.connectionState$
        .map((state: ConnectionState) => {
          console.log(state);
          return ConnectionState[state];
        });

      this.channelService.error$.subscribe(
        (error: any) => { console.warn(error); },
        (error: any) => { console.error("errors$ error", error); }
      );

      platform.resume.subscribe(() => {
        this.userService.isAuthenticated().then(res => {
          if (res) {
            this.channelService.start();
          }
        })
      });

    });
  }
}
