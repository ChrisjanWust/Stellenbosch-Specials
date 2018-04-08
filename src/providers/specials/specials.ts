import { Injectable } from '@angular/core';
import { Special } from '../../models/special';
import { HttpClient } from '@angular/common/http';
import { Environment } from "../environment/environment";

@Injectable()
export class Specials {
  specials: Special[] = [];
  specialsReturnList : Special [] = [];

  current_day: number;
  current_total_minutes: number;


  constructor(private http: HttpClient, private environment : Environment) {

    this.refreshTime();

    this.http.get("https://script.googleusercontent.com/macros/echo?user_content_key=UERskx7-iwDhnDNuTq8-Ro0YkDpovyO65nNjC6Itc9WB7v1Jw6LPMxkTGqkfyxV74vseQn4kDzcAjQESxhT8OmOTaV7YRNt3OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa5V7SzAZj2xBfFDRtNxpfsmuqfjnOYLBpWrI3G8IWJh29l4LSossvEa_fiNHZ0znxEBErwHi9mmizD2yLEI6hMgowX7VHBbY3ueWB-hBmNQUaUrheRB6cHFf3Qh7U9j_-VvdsqYhfGkQQ3wbFDNRb7QmlNN8bOQSLzbuyV5WyKSa&lib=M7OO09pfGNQD9igEAo4bouJoiE_6Oxspk").subscribe(data =>{

        console.log(data);
        console.log("Current total minutes: " + this.current_total_minutes);


        let results: any = data; // moet seker eintlik regte tiepe define

        for (let special of results.records) {
          special.price = Math.round(special.price);

          if (special.minute_start != 0){
            special.minutes_till_start = special.minute_start - this.current_total_minutes;
          }
          if (special.minute_end != 0) {
            special.minutes_till_end = special.minute_end - this.current_total_minutes;
          }

          this.specials.push(new Special(special));
        }

        //console.log(this.specials);
        //console.log("Length of specials: " + this.specials.length);

        // once result received, update return list
        this.updateReturnList();

        console.log(this.specials);

      });
    }



  /*

  add(newSpecial: Special) {

  }

  edit(oldSpecial: Special, newSpecial: Special) {
  }

  */

  query(params?: any) {
    console.log("Executing query - specials.ts");
    if (!params) {
      console.log("Length of specials: " + this.specials.length + " - query");

      // should probably for loop through specials and push to specialsReturnList to keep pointer the same
      this.specialsReturnList = this.specials;
      return this.specialsReturnList;
    }

    if (params[0].equals("today")){

    }

    return this.specials.filter((special) => {
      for (let key in params) {
        let field = special[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return special;
        } else if (field == params[key]) {
          return special;
        }
      }
      return null;
    });
  }


  queryDay(day_num : number = this.current_day){
    // clear temp list
    this.specialsReturnList.length = 0;

    this.refreshTime();

    for (let special of this.specials) {
      if (this.isOrBecomingAvailable(day_num, special.day_num, special.day_end_num, special.minutes_till_end)){
        this.specialsReturnList.push(new Special(special));
      }
    }

    return this.specialsReturnList;
  }

  updateReturnList(){
    // bad quick & dirty
    this.queryDay(this.current_day);
  }

  /*
  time_left(special_day_num: string, special_day_end_num: string, special_time_start: string, special_time_end: string) {
    let time_left = null;

    if (parseInt(special_day_num) <= this.current_day && (parseInt(special_day_end_num) >= this.current_day || (parseInt(special_day_end_num) == 0 && parseInt(special_day_num) != 0))) {
      // test if within time
      console.log(this.totalMinutes(special_time_start) + " VS "  + this.current_total_minutes);
      if (this.totalMinutes(special_time_start) <= this.current_total_minutes){
        time_left = this.totalMinutes(special_time_end) - this.current_total_minutes;
      }
    }

    return time_left;
  }
  */


  // currently not working
  private isOrBecomingAvailable(day_num, special_day_num, special_day_end_num, special_minutes_till_end):boolean {
    if (parseInt(special_day_num) <= day_num && (parseInt(special_day_end_num) >= day_num || (parseInt(special_day_end_num) == 0 && parseInt(special_day_num) != 0))) {
      // test if available at current time

      if (special_minutes_till_end > 0 || special_minutes_till_end == null){
        return true;
      }else{
        return false; // can be simplified
      }

    }else{
      return false;
    }
  }

  private refreshTime() {
    // get time : use to check if special is currently available
    let date = new Date();
    this.current_day = date.getDay(); // returns day as a number (0-6)
    this.current_total_minutes = date.getHours() * 60 + date.getMinutes(); // return total number of minutes elapsed today

    if (this.environment.isDevEnvironment){
      this.current_total_minutes = 950;
      this.current_day = 2;
    }
  }
}
