import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/store/store.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent {

  formFieldsValues: any = {
    need: [null, Validators.required],
    description: [null, Validators.required],
    percent: [null, Validators.required]
  }

  form: FormGroup = this.fb.group(this.formFieldsValues);

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private service: GlobalService) { }

  addNew() {
    this.service.updateProgressBar(this.form.getRawValue());
    setTimeout(this.dismiss.bind(this), 200);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
