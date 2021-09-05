import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IProgress } from 'src/app/models/progress';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss'],
})
export class ViewPageComponent {
  @Input() bar: IProgress;

  constructor(private modalCtrl: ModalController) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
