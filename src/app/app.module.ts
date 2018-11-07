import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Dialogs } from '@ionic-native/dialogs';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { IntroPage } from '../pages/intro/intro';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { ListComponent } from '../components/list/list';
import { CreateNeedPage } from '../pages/create-need/create-need';
import { ViewPage } from '../pages/view/view';
import { SettingsPage } from '../pages/settings/settings';
import { StoreProvider } from '../providers/store/store';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoryPage,
    CreateNeedPage,
    ViewPage,
    IntroPage,
    SettingsPage,
    ProgressBarComponent,
    ListComponent,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HistoryPage,
    ViewPage,
    SettingsPage,
    IntroPage,
    CreateNeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    Dialogs,
    StoreProvider
  ]
})
export class AppModule {}
