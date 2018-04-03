import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {tryCatch} from "rxjs/util/tryCatch";

/**
 * Controls user's reading of notes
 */
@Injectable()
export class DevNotes {

  constructor(private http: HttpClient, private storage: Storage) {
  }

  private last_note_v : number = 0;

  /*
  Returns       meaning
  null          last note read
  note to read  display newest note
   */
  checkDevNotes() {
    return new Promise((resolve, reject) => {
      this.storage.get('last_note_read').then((last_note_read) => {
        console.log("Last note read: " + last_note_read);



        this.http.get("./assets/devNotes/last_note.json")
          .subscribe(data => {
            //console.log(res);
            let last_note : any = data;
            data = null;
            this.last_note_v = last_note.version;
            console.log("Last note version: "+last_note.version);


            if (last_note_read != last_note.version){
              // display last_note
              console.log("Display last note");

              resolve(last_note);
            } else{
              resolve(null);
            }



          }, error =>{
            console.log(error);
            reject();
          });
      });
    });
  }

  getLatestDevNote(){
    return new Promise((resolve, reject) => {
      this.http.get("./assets/devNotes/last_note.json")
        .subscribe(data => {
          //console.log(res);
          let last_note : any = data;
          data = null;
          this.last_note_v = last_note.version;
          resolve(last_note);
        }, error =>{
          console.log(error);
          reject();
        });
    });
  }

  justBeenRead(){
    if (this.last_note_v != 0){
      this.storage.set('last_note_read',this.last_note_v);
    }
  }
}
