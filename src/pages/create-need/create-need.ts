import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-create-need',
  templateUrl: 'create-need.html',
})
export class CreateNeedPage {
  data: object = {
    title: '',
    description: '',
    percent: 50
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  submit() {

  }

}
