import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import * as Hammer from 'hammerjs';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StorageService } from './providers/storage.service';
import { GlobalService } from './store/store.service';
import { DateService } from './providers/date.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from './providers/notification.service';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
    StorageService,
    GlobalService,
    DateService,
    DatePipe,
    NotificationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
