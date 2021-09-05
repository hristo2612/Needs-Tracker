import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AddNewComponent } from './add-new/add-new.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListComponent,
    ViewPageComponent,
    ProgressBarComponent,
    AddNewComponent
  ],
  exports: [
    ListComponent,
    ViewPageComponent,
    ProgressBarComponent,
    AddNewComponent
  ]
})
export class ComponentsModule {}
