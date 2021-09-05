import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ViewPageComponent } from '../view-page/view-page.component';
import { IProgress } from 'src/app/models/progress';
import { GlobalQuery } from 'src/app/store/store.query';
import { GlobalService } from 'src/app/store/store.service';
import { Destroyable } from 'src/app/util/destroyable';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends Destroyable implements OnInit {
  modal: any;
  bars: IProgress[];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private query: GlobalQuery,
    private service: GlobalService
    ) {
      super();
  }

  ngOnInit() {
    this.initSubscriptions();
  }

  async promptDialog(bar: IProgress) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Delete",
          handler: () => {
            this.service.removeProgressBar(bar);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }

  async showDescription(bar: IProgress) {
    this.modal = await this.modalCtrl.create({
      component: ViewPageComponent,
      componentProps: {
        bar
      }
    });
    await this.modal.present();
  }

  private initSubscriptions() {
    const todaySub = this.query.today$.subscribe((today) => {
      this.bars = today;
    });
    
    this.subscriptions.push(todaySub);
  }
}
