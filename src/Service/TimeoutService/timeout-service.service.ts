import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, interval, throttle } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeoutServiceService  {

  private idleSubject = new Subject<boolean>();
  private timeout = 900000;
  private lastActivity?: Date;
  private idleCheckInterval=10;
  private idleSubscriptions?: Subscription;


  constructor() { 
    this.resetTimer();
    this.startWatching();
  }

  get idleState(): Observable<boolean>{

    return this.idleSubject.asObservable();
  }


  private startWatching(){


    this.idleSubscriptions =interval(this.idleCheckInterval * 1000).pipe(
      throttle(()=>interval(1000))
    ).subscribe(()=>{
      const now = new Date();


      if(now.getTime() - this.lastActivity?.getTime()!  > this.timeout * 1000  ){
        this.idleSubject.next(true)
      }
    });
  }

  resetTimer(){
    this.lastActivity = new Date();
    this.idleSubject.next(false);
  }

  stopWatching() {
    if(this.idleSubscriptions) {
      this.idleSubscriptions.unsubscribe();
    }
  }
}
