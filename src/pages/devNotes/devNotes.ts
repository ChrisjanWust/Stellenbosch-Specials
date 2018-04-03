import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DevNotes } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'devNotes.html'
})
export class DevNotesPage {

  constructor(public navCtrl: NavController, public devNotes : DevNotes) {

    this.devNotes.getLatestDevNote().then(data => {
      const data2 : any = data;
      data = null;
      document.getElementById("devNoteText").innerHTML = data2.text_full;
      document.getElementById("devNoteTitle").innerHTML = data2.title;

    });

    this.devNotes.justBeenRead(); // might be required in very obscure scenarios
  }

}
