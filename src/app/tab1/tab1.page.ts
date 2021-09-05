import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewComponent } from '../components/add-new/add-new.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  modal: HTMLIonModalElement;
  
  constructor(private modalCtrl: ModalController) {}

  async createNeed() {
    this.modal = await this.modalCtrl.create({
      component: AddNewComponent
    });
    await this.modal.present();
  }
}
