/*
export class Special {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface Special {
  // [prop: string]: any;
  venue : string;

} */

export class Special {
  venue: string;
  //day: string;
  day_num: number;
  //day_end: string;
  day_end_num: number;
  time_start: Date = new Date();
  time_end: Date = new Date();
  food_type: string;
  food_description: string;
  //description_depreciating: string;
  price: number;
  price_max: number;
  discount_type: string;
  //know_to_be_valid: string;
  //valid_untill: string;
  students_only: boolean;
  imgur_url: string;
  time_start_hour: number;
  time_start_minute: number;
  time_end_hour: number;
  time_end_minute: number;

  constructor(init?: any) {
    for (const key in init) {
      if (init.hasOwnProperty(key)) {
        this[key] = init[key];
      }
    }
  }
}
