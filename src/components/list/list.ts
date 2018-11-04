import { Component, Input } from "@angular/core";
import { ActionSheetController } from "ionic-angular";
import { Dialogs } from '@ionic-native/dialogs';
import { ModalController } from 'ionic-angular';
import { ViewPage } from "../../pages/view/view";

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

  constructor(public actionSheetCtrl: ActionSheetController, private dialogs: Dialogs, public modalCtrl: ModalController) {
    //console.log("Hello ListComponent Component");
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

  showDescription(indexObject): void {
    const modal = this.modalCtrl.create(ViewPage, indexObject);
    modal.present();
    //this.dialogs.alert(bar.description, 'Description');
  }
}
