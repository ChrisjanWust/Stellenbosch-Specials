export class Special {
  venue: string;
  day_num: number;
  day_end_num: number;
  food_type: string;
  food_description: string;
  price: number;
  price_max: number;
  discount_type: string;
  students_only: boolean;
  img_url: string;
  minute_start: number;
  minute_end: number;
  minutes_till_start: number;
  minutes_till_end: number;

  constructor(init?: any) {
    for (const key in init) {
      if (init.hasOwnProperty(key)) {
        this[key] = init[key];
      }
    }
  }
}
