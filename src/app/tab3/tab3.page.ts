import { Component, OnInit } from '@angular/core';
import { DateService } from '../providers/date.service';
import { INotification, ISettings } from '../store/store';
import { GlobalQuery } from '../store/store.query';
import { GlobalService } from '../store/store.service';
import { Destroyable } from '../util/destroyable';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page extends Destroyable implements OnInit {

  showNumbers: boolean = true;
  enableNotifications: boolean = true;
  selectedTime: string = '00:00';
  repeats: boolean = false;

  notifications: INotification[] = [];

  constructor(private date: DateService, private service: GlobalService, private query: GlobalQuery) {
    super();
  }

  ngOnInit() {
    this.initSubscribers();
  }

  onShowNumberChange() {
    this.service.updateSettings({ showPercentage: this.showNumbers });
  }

  onEnableNotificationsChange() {
    this.service.updateSettings({ toggleNotifications: this.enableNotifications });
  }

  addNotification() {
    this.service.addNotification({
      repeats: this.repeats,
      time: this.date.getHoursAndMinutes(this.selectedTime)
    });
  }

  deleteNotification(id: number) {
    this.service.removeNotification(id);
  }

  private initSubscribers() {
    const settingsSub = this.query.settings$.subscribe((settings: ISettings) => {
      this.showNumbers = settings.showPercentage;
      this.enableNotifications = settings.toggleNotifications;
      this.notifications = settings.reminders;
    });

    this.subscriptions.push(settingsSub);
  }
}
