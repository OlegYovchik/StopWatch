import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stringHour = "00";
  stringSec = "00";
  stringMin = "00";
  stringMili = "00";

  countMili = 0;
  countSec = 0;
  countMin = 0;
  countHour = 0;

  proccess: any;
  
  start(){
    this.proccess = setInterval(()=>{
      this.countMili++;
      if(this.countMili <= 99){
        if(this.countMili <= 9){
          this.stringMili = "0" + String(this.countMili);
        }else{
          this.stringMili = String(this.countMili);
        }
      }else{
        this.countMili = 0;
        this.stringMili = "00";
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
    }, 10);
  }
  pause(){
    clearInterval(this.proccess);
  }
  reset(){
    clearInterval(this.proccess);
    this.stringHour = this.stringSec = this.stringMin = this.stringMili = "00";
    this.countMili = this.countSec = this.countMin = this.countHour = 0;
  }
}
