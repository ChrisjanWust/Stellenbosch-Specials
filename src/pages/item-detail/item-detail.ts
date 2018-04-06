import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Special } from '../../models/special';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  special: Special;

  constructor(public navCtrl: NavController, navParams: NavParams, public socialSharing: SocialSharing) {
    this.special = navParams.get('special');
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

  shareText() : void{
    let msg : string = '';

    if (this.special.discount_type){
      msg += this.special.discount_type + ' ' + this.special.food_description.toLowerCase();
    } else{
      msg += this.special.food_description;
    }

    msg += ' at ' + this.special.venue;

    if (this.special.price){
      msg += '\nR' + this.special.price;
    }

    if (this.special.time_start_hour){
      msg += '\n' + this.special.time_start_hour + 'h';
      if (this.special.time_start_minute){
        msg += this.special.time_start_minute;
      }
      msg += ' till ' + this.special.time_end_hour + 'h';

      if (this.special.time_end_minute){
        msg+= this.special.time_end_minute;
      }
    }

    if (this.special.day_num != this.special.day_end_num){
      msg += '\n'  + this.convertToDay(this.special.day_num) + ' till ' + this.convertToDay(this.special.day_end_num);
    }

    if (this.special.students_only){
      msg += '\n' + "Students only";
    }

    msg += '\nShared from Stellenbosch Specials - https://play.google.com/store/apps/details?id=co.za.chrisjanwust';

    console.log(msg);
    this.socialSharing.share(msg);
  }

}
