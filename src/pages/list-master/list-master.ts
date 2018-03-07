import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import { Special } from '../../models/special';
import { Specials } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  currentSpecials: Special[];
  //current_day: number;

  constructor(public navCtrl: NavController, public items: Items, public specials: Specials, public modalCtrl: ModalController) {
    this.currentItems = this.items.query(); // marked for deletion
    this.currentSpecials = this.specials.queryDay();

    // get day of the week and update ion-select in filter menu
    // doesn't seem to be supported by ionid!!
    //this.current_day = new Date().getDay(); // returns day as a number (0-6)
    //this.daySelectValue = "" + this.current_day;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(special: Special) {
    this.navCtrl.push('ItemDetailPage', {
      special: special
    });
  }

  openSpecial(special: Special) {
    this.navCtrl.push('ItemDetailPage', {
      special: special
    });
  }

  selectedDayChanged(new_day: string){
    console.log("Day changed to " + typeof new_day + " : " + new_day);
    this.currentSpecials = this.specials.queryDay(parseInt(new_day));
  }
}
