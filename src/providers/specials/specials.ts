import { Injectable } from '@angular/core';

import { Special } from '../../models/special';
//import { Api } from '../api/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Specials {
  specials: Special[] = [];
  specialsReturnList : Special [] = [];

  current_day: number;
  current_total_minutes: number;

  // try 5


  // try 4
  /*
  private data: Observable<Array<Special>>;
  private values: Array<number> = [];
  private anyErrors: boolean;
  private finished: boolean;

*/

  constructor(private http: HttpClient) {
    //try 5
    let results;


    // try 4



    // try 3

    /*
    getHeroes (): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.heroesUrl)
    }
    */

/*
    console.log("Does this log");

    let temp1: Observable<Special[]> = http.get<Object[]>("https://sheetdb.io/api/v1/5a8cae0b9bf7f").pipe(
      tap(result => {
        console.log("result found");
        for (let special of result) {
          console.log("Reading special from result");
          this.specials.push(new Special(special));
        }
      })
    );
    */


    // try 2
    /*
    http.get("https://sheetdb.io/api/v1/5a8cae0b9bf7f")
      .subscribe(response => {
        //this.result =data[0];

        this.result = JSON.parse(response.statusText);

        for (let special of this.result) {
          this.specials.push(new Special(special));
        }

      });

    /**/
    // try 1

    this.http.get("https://sheetdb.io/api/v1/5a8cae0b9bf7f").subscribe(data =>{

      results = data;
      //console.log("Received response from the server");
      for (let special of results) {
        this.specials.push(new Special(special));
      }

      //console.log(this.specials);
      //console.log("Length of specials: " + this.specials.length);

      // once result received, update return list
      this.updateReturnList();

    });

  }

  add(newSpecial: Special) {

  }

  edit(oldSpecial: Special, newSpecial: Special) {
  }

  query(params?: any) {
    console.log("Executing query - specials.ts");
    if (!params) {
      console.log("Length of specials: " + this.specials.length + " - query");
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


  queryToday(){
    console.log("Does this execute? - queryToday");

    // clear temp list
    this.specialsReturnList.length = 0;

    // get time : use to check if special is currently available
    let date = new Date();
    console.log("Does this execute? " + date.getDay())
    this.current_day = date.getDay(); // returns day as a number (0-6)
    this.current_total_minutes = date.getHours() * 60 + date.getMinutes(); // return total number of minutes elapsed today

    // developing
    //this.current_day = 1;
    //this.current_total_minutes = 12*60 + 12; // only in developing mode

    // check all specials

    console.log("Length of specials: " + this.specials.length);

    for (let special of this.specials) {

      //console.log(special.day_num + " VS " + day);
      //console.log(special.time_end + " VS " + hour + ":" + minute + " TYPE: " + (typeof special.day_num));

//      if ((special.day_num == day || (special.day_num <= day && special.day_end_num >= day)) && true){
      if (this.if_available_today(special.day_num, special.day_end_num, special.time_start, special.time_end) != null){
        this.specialsReturnList.push(new Special(special));
      }
    }

    // debugging
    console.log("Return list:\n" + this.specialsReturnList);

    // return new list
    return this.specialsReturnList;
  }

  updateReturnList(){
    // bad quick & dirty
    this.queryToday();
  }

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

  // deprecating, only used while times are not available
  if_available_today(special_day_num: string, special_day_end_num: string, special_time_start: string, special_time_end: string) {
    let time_left = null;

    if (parseInt(special_day_num) <= this.current_day && (parseInt(special_day_end_num) >= this.current_day || (parseInt(special_day_end_num) == 0 && parseInt(special_day_num) != 0))) {
      // test if within time
      time_left = 1;
    }

    return time_left;
  }

  // return total minutes elapsed in day from string in the following format "11:30"
  totalMinutes(time_in: string){
    // avoid crashing on too short input string

    console.log(time_in);
    try{
      //let totalMinutesReturn = parseInt(time_in.substr(0,2)) * 60 + parseInt(time_in.substr(2,2));
      //console.log("Hour: " + parseInt(time_in.substr(0,2)) + "\tMin: " + parseInt(time_in.substr(2,2)));
      return (parseInt(time_in.substr(0,2)) * 60 + parseInt(time_in.substr(3,2)));
    }catch (e){
      console.log (e)
    }

  }


}
