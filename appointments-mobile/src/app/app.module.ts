import { NgModule, ErrorHandler, Injector } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { XHRBackend, Http, RequestOptions } from "@angular/http";
import { Storage, IonicStorageModule } from '@ionic/storage';

import { InterceptedHttp } from '../shared/utils/InterceptedHttp'
import { UserService } from '../shared/services/UserService'
import { Api } from '../shared/utils/Api'

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from "../pages/profile/profile";
import { EditProfilePage } from "../pages/editProfile/editProfile";
import { SettingService } from "../shared/services/SettingService";
import { AppointmentsPage } from "../pages/appointments/appointments";
import { DatesPopoverPage } from "../pages/dates-popover/dates-popover";
import { ChannelConfig, ChannelService, SignalrWindow } from "../shared/services/channel.service";
import { MessagesPage } from "../pages/messages/messages";
import { MessageService } from "../shared/services/MessageService";
import { MessagePage } from "../pages/message/message";
import { AdviserService } from "../shared/services/AdviserService";
import { AdvisersPopoverPage } from "../pages/advisers-popover/advisers-popover";


export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, injector: Injector): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, injector);
}

let channelConfig = new ChannelConfig();
channelConfig.url =  "http://appointmentapp.azurewebsites.net/signalr"; // "http://localhost:6634/signalr"; //
channelConfig.hubName = "AppointmentHub";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WelcomePage,    
    SignupPage,
    ProfilePage,
    EditProfilePage,
    AppointmentsPage,
    DatesPopoverPage,
    MessagesPage,
    MessagePage,
    AdvisersPopoverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WelcomePage,    
    SignupPage,
    ProfilePage,
    EditProfilePage,
    AppointmentsPage,
    DatesPopoverPage,
    MessagesPage,
    MessagePage,
    AdvisersPopoverPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Injector]
    },    
    UserService,
    Api,
    SettingService,
    ChannelService,
    { provide: SignalrWindow, useValue: window },
    { provide: 'channel.config', useValue: channelConfig },
    MessageService,
    AdviserService
  ]
})
export class AppModule { }
