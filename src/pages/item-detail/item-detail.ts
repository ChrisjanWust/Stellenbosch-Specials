import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Specials } from "../../providers/specials/specials";

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  special: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.special = navParams.get('special');
  }

}
