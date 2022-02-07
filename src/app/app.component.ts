import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  trigger$ = interval(10)
  subscribing: Subscription = new Subscription();

  count: number = 0;
  stringHour = "00";
  stringSec = "00";
  stringMin = "00";
  stringMili = "00";

  countMili = 0;
  countSec = 0;
  countMin = 0;
  countHour = 0;

  lastCount = 0;

  isPlay = false;
  isPause = false;

  countClick = 0;
  click1:any;
  click2:any;

  constructor(){}

  start(){
      this.isPlay = true;
      this.isPause = false;
      this.subscribing = this.trigger$.subscribe((x)=>{
      this.stringWatch();
      if(this.countMili < 99){
        this.countMili=x; 
        if(this.countMili<10){
          this.stringMili = "0" + String(this.countMili)  
        }else{
          this.stringMili = String(this.countMili)  
        }
      }else{
        this.subscribing.unsubscribe();
        this.countMili = 0;
        this.start();
      }
    })
  };
  reset(){
    this.isPlay = false;
    this.countMili = this.countSec = this.countMin = this.countHour = 0;
    this.stringMili = this.stringSec = this.stringMin = this.stringHour = "00";
  }
  pause(){
    if(this.countClick==0){
      this.click1 = new Date();
      this.countClick++;
    }else{
      this.countClick++;
    }
   if(this.countClick == 2){
     this.click2 = new Date();
     this.countClick = 0;
     if((this.click2-this.click1)<=300){
       this.countClick = 0;
       this.wait();
     }
   }
  }
  wait(){
    this.subscribing.unsubscribe();
    this.isPlay = false;
    this.isPause = true;
  }
  stringWatch(){
    if(this.countMili == 99){
      this.countSec++;
      if(this.countSec <= 59){
        if(this.countSec <= 9){
          this.stringSec = "0" + String(this.countSec);
        }else{
          this.stringSec = String(this.countSec);
        }
      }else{
        this.countSec = 0;
        this.stringSec = "00";
        this.countMin++;
        if(this.countMin <= 59){
          if(this.countMin <= 9){
            this.stringMin = "0" + String(this.countMin);
          }else{
            this.stringMin = String(this.countMin);
          }
        }else{
          this.countMin = 0;
          this.stringMin = "00";
          this.countHour++;
          if(this.countHour <= 9){
            this.stringHour = "0" + String(this.countHour);
          }else{
            this.stringHour = String(this.countHour);
          }
          this.stringHour = String(this.countHour);
        } 
      }
    }
  }
}
