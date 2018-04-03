import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Special } from '../../models/special';
import { Specials } from '../../providers/providers';
import { AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { DevNotes } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentSpecials: Special[];

  constructor(public navCtrl: NavController, public specials: Specials, public modalCtrl: ModalController, public alertCtrl: AlertController, public devNotes : DevNotes, public menuCtrl: MenuController) {
    this.showUpdates();

    this.currentSpecials = this.specials.queryDay();



    // get day of the week and update ion-select in filter menu
    // doesn't seem to be supported by ionic!!
    // would be nice to have a workaround for this
    //this.current_day = new Date().getDay(); // returns day as a number (0-6)
    //this.daySelectValue = "" + this.current_day;
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.

  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }
*/
  /**
   * Delete an item from the list of items.

  deleteItem(item) {
    this.items.delete(item);
  }
   */

  /**
   * Navigate to the detail page for this item.
   */

  openSpecial(special: Special) {
    this.navCtrl.push('ItemDetailPage', {
      special: special
    });
  }

  selectedDayChanged(new_day: string){
    console.log("Day changed to " + typeof new_day + " : " + new_day);
    document.getElementById("pageTitle").firstElementChild.innerHTML = this.convertToDay(parseInt(new_day)) + "'s Specials";
    this.currentSpecials = this.specials.queryDay(parseInt(new_day));

    this.closeRightMenu();
  }

  private closeRightMenu() : void {
    this.menuCtrl.toggle('menu2');
  }

  convertToDay(day: number){
    switch (day){
      case 0: return 'Sunday';
      case 1: return 'Monday';
      case 2: return 'Tuesday';
      case 3: return 'Wednesday';
      case 4: return 'Thursday';
      case 5: return 'Friday';
      case 6: return 'Saturday';
      default: return null;
    }
  }


  showUpdates(){
    this.devNotes.checkDevNotes().then(data => {
      if (data != null){ // returns null if latest note has already been read, otherwise return latest note as an object
        const data2 : any = data; // really don't know why we need to do this
        data = null;

        this.alertCtrl.create({
          title: data2.title,
          message: data2.text,
          buttons: [
            {
              text: 'Read more',
              handler: () => {
                this.navCtrl.push('DevNotesPage');
              }
            },
            {
              text: 'Not now',
              handler: () => {
              }
            }
          ]
        }).present();

        this.devNotes.justBeenRead(); // in all scenarios (read more, not now, taps on screen outside alert area), we don't want to show the note again

      }
    });

  }

}
