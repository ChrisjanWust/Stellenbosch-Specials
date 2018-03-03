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
  current_hour: number;
  current_minute: number;

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
    this.current_day = date.getDay(); // returns day as a number
    this.current_hour = date.getHours();
    this.current_minute = date.getMinutes();

    // check all specials

    console.log("Length of specials: " + this.specials.length);

    for (let special of this.specials) {

      //console.log(special.day_num + " VS " + day);
      //console.log(special.time_end + " VS " + hour + ":" + minute + " TYPE: " + (typeof special.day_num));

//      if ((special.day_num == day || (special.day_num <= day && special.day_end_num >= day)) && true){
      if (this.check_if_available(special.day_num, special.day_end_num, special.time_start, special.time_end)){
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

  check_if_available(special_day_num: number, special_day_end_num: number, special_time_start: string, special_time_end: string){
    // first check if day is valid before spending time converting strings to ints
    if (special_day_num <= this.current_day && special_day_end_num >= this.current_day){
      return true;
    }
    return false;
  }


}
