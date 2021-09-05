import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IProgress } from '../models/progress';

export const initialProgressBars: any[] = [
  {
    need: 'Work',
    percent: 80,
    description: 'Finished work or chores'
  },
  {
    need: 'Social',
    percent: 70,
    description: 'Your social interactions'
  },
  {
    need: 'Mental Health',
    percent: 60,
    description: 'State of your mind, perhaps you might be feeling under the weather or over the moon?'
  },
  {
    need: 'Family',
    percent: 50,
    description: 'Did you interact with your family today?'
  },
  {
    need: 'Environment',
    percent: 40,
    description: 'State of your home place. Is it dusty or clean?'
  },
  {
    need: 'Energy',
    percent: 10,
    description: 'Define your energy levels for today'
  }
];

export interface ISettings {
  showPercentage?: boolean;
  toggleNotifications?: boolean;
  reminders?: INotification[];
}

export interface IProgressHistory {
  date: string;
  progress: IProgress[];
}

export interface INotification {
  id?: number;
  repeats: boolean;
  time: {
    hour: number;
    minute: number;
  }
}

export interface State {
  today: IProgress[];
  history: IProgressHistory[];
  settings: ISettings;
}

export function createInitialState(): State {
  return {
    today: initialProgressBars,
    history: [],
    settings: {
      showPercentage: true,
      toggleNotifications: true,
      reminders: []
    }
  };
}

@Injectable( { providedIn: 'root' })
@StoreConfig({ name: 'global' })
export class GlobalStore extends Store<State> {
  constructor() {
    super(createInitialState());
  }
}