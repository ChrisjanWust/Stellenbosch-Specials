import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DevNotesPage } from './devNotes';

@NgModule({
  declarations: [
    DevNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(DevNotesPage),
    TranslateModule.forChild()
  ],
  exports: [
    DevNotesPage
  ]
})
export class DevNotesPageModule { }
