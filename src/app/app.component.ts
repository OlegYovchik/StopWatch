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

  isStop = false;
  isPlay = false;

  constructor(){}

  start(){
      this.isStop = false;
      this.isPlay = true;
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
  stop(){
    this.subscribing.unsubscribe();
    this.isStop = true;
    this.isPlay = false;
  };
  reset(){
    this.isStop = false;
    this.isPlay = false;
    this.countMili = this.countSec = this.countMin = this.countHour = 0;
    this.stringMili = this.stringSec = this.stringMin = this.stringHour = "00";
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
