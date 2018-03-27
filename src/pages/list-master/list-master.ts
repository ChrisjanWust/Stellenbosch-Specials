import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import { Special } from '../../models/special';
import { Specials } from '../../providers/providers';
import { AlertController } from 'ionic-angular';

import { DevNotes } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  currentSpecials: Special[];
  loader: any;
  //current_day: number;

  constructor(public navCtrl: NavController, public items: Items, public specials: Specials, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public devNotes : DevNotes) {
    this.showUpdates();

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


  showUpdates(){
    this.devNotes.checkDevNotes().then(data => {
      if (data != null){
        const data2 : any = data;
        data = null;
        this.alertCtrl.create({
          title: data2.title,
          message: data2.text,
          buttons: [
            {
              text: 'Read later',
              handler: () => {
                // this.devNotes.justBeenRead();
              }
            },
            {
              text: 'Ok',
              handler: () => {
                this.devNotes.justBeenRead();
              }
            }
          ]
        }).present();
      }
    });

    /*
    this.devNotes.checkDevNotes().then(data =>{
      console.log(data);
      }

    );

    /*
    this.devNotes.checkDevNotes().then(function(data){
      //handle the success condition here
      console.log(data);
    });

    //console.log("Last note read: " + last_note_read);
    /*
    if(last_note_read==null){
      // first launch?
    }else if (last_note_read != last_note.version){


    }

    /*

    if (!this.storage.get('last_updates_read')){
      let confirm = this.alertCtrl.create({
        title: 'Use this lightsaber?',
        message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
        buttons: [
          {
            text: 'Read later',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Ok',
            handler: () => {
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    }
    */
  }


}
