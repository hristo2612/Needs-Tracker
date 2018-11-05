import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ActionSheetController } from "ionic-angular";
import { ModalController } from 'ionic-angular';
import { ViewPage } from "../../pages/view/view";
import { Storage } from "@ionic/storage";

@Component({
  selector: "list",
  templateUrl: "list.html"
})
export class ListComponent {
  private _bars: object[];

  get bars(): object[] {
    return this._bars;
  }

  @Input()
  set bars(bars: object[]) {
    this._bars = bars;
  }

  @Output() onChangeProgress = new EventEmitter();

  constructor(public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController, private storage: Storage) {
  }

  promptDialog(array, index): void {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Delete",
          handler: () => {
            array.splice(index, 1);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  setBarClasses(arr) {
    arr.forEach((target) => {
      if (target.percent > 75) {
        target.className = 'good';
      } else if (target.percent > 59) {
        target.className = 'decent';
      } else if (target.percent > 29) {
        target.className = 'warning';
      } else {
        target.className = 'danger';
      }
    });
  }

  showDescription(indexObject): void {
    const modal = this.modalCtrl.create(ViewPage, indexObject);
    modal.present();
    modal.onWillDismiss(() => {
      this.storage.get('progressBars').then((data) => {
        this.onChangeProgress.emit(data);
      });
    });
  }
}
