import { Injectable } from '@angular/core';
import { IProgress } from '../models/progress';
import { DateService } from '../providers/date.service';
import { NotificationService } from '../providers/notification.service';
import { StorageService } from '../providers/storage.service';
import { GlobalStore, IProgressHistory, ISettings, INotification, State } from './store';

@Injectable()
export class GlobalService {
  constructor(private store: GlobalStore, private storage: StorageService, private date: DateService, private notification: NotificationService) {}

  async setupStateFromStorage() {
    const today = await this.storage.getProgress();
    const history = await this.storage.getAllProgress();
    const settings = await this.storage.getSettings();
    this.store.update((state: State) => ({ 
      today: (today ? today : state.today),
      history: (history ? history : state.history),
      settings: (settings ? settings : state.settings)
    }));

    this.updateProgressHistoryForToday();
  }

  updateProgressBar(bar: IProgress) {
    this.store.update((state: State) => {
      const currentProgress = state.today.find((item) => item.need === bar.need);
      let updated: IProgress[];
      if (currentProgress) {
        updated = state.today.map((item) => item.need === bar.need ? bar : item);
      } else {
        updated = [...state.today, bar];
      }
      this.storage.setProgress(updated);
      return { today: updated };
    });

    this.updateProgressHistoryForToday();
  }

  removeProgressBar(bar: IProgress) {
    // Remove from today
    this.store.update((state: State) => {
      const updated = state.today.filter((item) => item.need !== bar.need);
      this.storage.setProgress(updated);
      return { today: updated };
    });
    // Remove from history
    this.store.update((state: State) => {
      const updated = state.history.map((item) => {
        const newProgress = item.progress.filter((item) => item.need !== bar.need);
        return { ...item, progress: newProgress };
      });
      this.storage.setAllProgress(updated);
      return { history: updated };
    });
  }

  resetProgressBars() {
    this.storage.setProgress([]);
    this.store.update({ today: [] });
  }

  updateProgressHistoryForToday() {
    const date = new Date();
    // date.setDate(date.getDate() + 4)
    const currentDate = this.date.dateToString(date);

    this.store.update((state: State) => {
      const currentDateProgress = state.history.find((item) => item.date === currentDate);
      let updated: IProgressHistory[];
      if (currentDateProgress) {
        updated = state.history.map((item) => {
          return item.date === currentDate ? { date: currentDate, progress: state.today } : item
        });
      } else {
        updated = [...state.history, { date: currentDate, progress: state.today }];
      }
      this.storage.setAllProgress(updated);
      return { history: updated };
    });
  }

  resetProgressHistory() {
    this.storage.setAllProgress([]);
    this.store.update({ history: [] });
  }

  updateSettings(settings: ISettings) {
    this.store.update((state: State) => {
      const updated = { ...state.settings, ...settings };
      this.storage.setSettings(updated);
      return { settings: updated }
    });
  }

  resetSettings() {
    this.storage.setSettings({
      showPercentage: true,
      toggleNotifications: true,
      reminders: [],
    });
    this.store.update({
      settings: {
        showPercentage: true,
        toggleNotifications: true,
        reminders: [],
      },
    });
  }

  addNotification(notification: INotification) {
    this.store.update((state: State) => {
      const updated = { ...state.settings, reminders: [...state.settings.reminders, {...notification, id: state.settings.reminders.length }] };
      this.storage.setSettings(updated);
      this.notification.scheduleNotification(updated.reminders[updated.reminders.length - 1]);
      return { settings: updated };
    });
  }

  removeNotification(index: number) {
    this.store.update((state: State) => {
      const updated = { ...state.settings, reminders: state.settings.reminders.filter((item, i) => i !== index) };
      this.storage.setSettings(updated);
      this.notification.removeNotification(index);
      return { settings: updated };
    });
  }
}