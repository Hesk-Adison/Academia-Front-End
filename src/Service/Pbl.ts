import { delay } from "rxjs";

export class Pbl{
       
  async Stamp(origem:string='DMZ'):Promise<string>{

       await delay(1000);
      var moment = new Date();
      // Year gets 1999.
      var year = moment.getUTCFullYear();
      // Month gets 1 (January).
      var month = moment.getMonth();
      // Day gets 13.
      var day = moment.getDay();
      // Hour gets 3.
      var hour = moment.getHours();
      // Minute gets 57.
      var minute = moment.getMinutes();
      // Second gets 32.
      var second = moment.getSeconds();
      // Millisecond gets 11.
      var millisecond = moment.getMilliseconds;
      var stamp = millisecond + "D" + year + month + origem + day + hour + minute + second;
      return stamp;
      
     }
}