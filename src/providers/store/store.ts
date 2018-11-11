import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StoreProvider {
  public showPercent: boolean;

  constructor(private storage: Storage) {
  }

  concatAll(arr) {
      var results = [];
      arr.forEach(function(subArray) {
        if (Array.isArray(subArray))
          subArray.forEach((item) => results.push(item))
        else
          throw new Error('Its not two dimensional array;');
      });
    
      return results;
  }

  togglePercent() {
    this.storage.set('togglePercent', !this.showPercent).then((value) => {
      this.showPercent = value;
    });
  }

  getCurrentDate() {
    return this.storage.get('currentDate');
  }

  setCurrentDate(date) {
    return this.storage.set('currentDate', date);
  }

  getProgress() {
    return this.storage.get('progressBars');
  }

  setProgress(bar) {
    return this.storage.set('progressBars', bar);
  }

  getAllProgress() {
    return this.storage.get('allProgress');
  }

  setAllProgress(progressBarsArray) {
    return this.storage.set('allProgress', progressBarsArray);
  }

  populateAllProgress() {
      return this.setAllProgress([
      {
        "date": {
          "date": {
            "day": 7,
            "month": 10
          }
        },
        "bars": [
          {
            "need": "Work",
            "percent": 42,
            "description": "How is work today? Good? Bad?"
          },
          {
            "need": "Social",
            "percent": 50,
            "description": "How recently have you seen your friends?"
          },
          {
            "need": "Mental Health",
            "percent": 99,
            "description": "How is your mental state for today? Are you happy, anxious or perhaps stressed?"
          },
          {
            "need": "Family",
            "percent": 44,
            "description": "How much time have you spent with your family members, just enough, too little?"
          },
          {
            "need": "Environment",
            "percent": 69,
            "description": "How do you feel about the state of your home place? Maybe a little bit dirty or dusty, or shining like a diamond?"
          },
          {
            "need": "Energy",
            "percent": 12,
            "description": "How much power do you think you have. Are you feeling a bit tired, sick or just great!?"
          }
        ]
      },
      {
        "date": {
          "date": {
            "day": 8,
            "month": 10
          }
        },
        "bars": [
          {
            "need": "Work",
            "percent": 75,
            "description": "How is work today? Good? Bad?"
          },
          {
            "need": "Social",
            "percent": 99,
            "description": "How recently have you seen your friends?"
          },
          {
            "need": "Mental Health",
            "percent": 99,
            "description": "How is your mental state for today? Are you happy, anxious or perhaps stressed?"
          },
          {
            "need": "Family",
            "percent": 99,
            "description": "How much time have you spent with your family members, just enough, too little?"
          },
          {
            "need": "Environment",
            "percent": 99,
            "description": "How do you feel about the state of your home place? Maybe a little bit dirty or dusty, or shining like a diamond?"
          },
          {
            "need": "Energy",
            "percent": 95,
            "description": "How much power do you think you have. Are you feeling a bit tired, sick or just great!?"
          }
        ]
      },
      {
        "date": {
          "date": {
            "day": 9,
            "month": 10
          }
        },
        "bars": [
          {
            "need": "Work",
            "percent": 75,
            "description": "How is work today? Good? Bad?"
          },
          {
            "need": "Social",
            "percent": 50,
            "description": "How recently have you seen your friends?"
          },
          {
            "need": "Mental Health",
            "percent": 77,
            "description": "How is your mental state for today? Are you happy, anxious or perhaps stressed?"
          },
          {
            "need": "Family",
            "percent": 67,
            "description": "How much time have you spent with your family members, just enough, too little?"
          },
          {
            "need": "Environment",
            "percent": 34,
            "description": "How do you feel about the state of your home place? Maybe a little bit dirty or dusty, or shining like a diamond?"
          },
          {
            "need": "Energy",
            "percent": 42,
            "description": "How much power do you think you have. Are you feeling a bit tired, sick or just great!?"
          }
        ]
      },
      {
        "date": {
          "date": {
            "day": 10,
            "month": 10
          }
        },
        "bars": [
          {
            "need": "Work",
            "percent": 7,
            "description": "How is work today? Good? Bad?"
          },
          {
            "need": "Social",
            "percent": 99,
            "description": "How recently have you seen your friends?"
          },
          {
            "need": "Mental Health",
            "percent": 6,
            "description": "How is your mental state for today? Are you happy, anxious or perhaps stressed?"
          },
          {
            "need": "Family",
            "percent": 100,
            "description": "How much time have you spent with your family members, just enough, too little?"
          },
          {
            "need": "Environment",
            "percent": 80,
            "description": "How do you feel about the state of your home place? Maybe a little bit dirty or dusty, or shining like a diamond?"
          },
          {
            "need": "Energy",
            "percent": 50,
            "description": "How much power do you think you have. Are you feeling a bit tired, sick or just great!?"
          }
        ]
      }
    ]);
  }

}
