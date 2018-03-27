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
      document.getElementById("devNotesHere").innerText = data2.text;
    })

  }

}
