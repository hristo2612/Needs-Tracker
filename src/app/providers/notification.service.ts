import { Injectable } from '@angular/core';
import { LocalNotifications, LocalNotificationDescriptor } from '@capacitor/local-notifications'
import { INotification } from '../store/store';

@Injectable()
export class NotificationService {
  constructor() {}

  async scheduleNotification(notification: INotification) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Track your Needs!',
          body: 'Time for an update.',
          id: notification.id,
          schedule: {
            on: { hour: notification.time.hour, minute: notification.time.minute },
            allowWhileIdle: true
          }
        }
      ]
    })
  }

  async removeNotification(id: number) {
    await LocalNotifications.cancel({ notifications: [{ id }]});
  }
}