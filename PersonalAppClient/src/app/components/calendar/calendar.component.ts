import { Component, OnInit } from '@angular/core';
import dateOfWeek from 'src/shared/const/dateOfWeek';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private days : Array<string>;
  week1: number = 0;
  week2: number = 0;
  week3: number = 0;
  week4: number = 0;
  week5: number = 0;
  week6: number = 0;
  week1NextMonth: number = 0;
  week2NextMonth: number = 0;
  dayOfPreviousMonth: number = 0;
  totalDayOfCurrentMonth: number = 0;
  totalDayOfPreviousMonth: number = 0;
  firstDayInCurrentMonth: string = '';

  constructor(
  ) {
    this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  }

  ngOnInit(): void {
    this.renderCalendar();
  }

  renderCalendar() : void{
    const date = new Date();
    this.totalDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
    this.totalDayOfPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    this.firstDayInCurrentMonth = this.days[new Date(date.getFullYear(), date.getMonth(), 1).getDay()];

    switch (true) {
      case this.firstDayInCurrentMonth === dateOfWeek.SUNDAY:
        this.week1 = 7;
        this.week2 = this.week1 + 7;
        this.week3 = this.week2 + 7;
        this.week4 = this.week3 + 7;
        this.dayOfPreviousMonth = 0;
        if(this.totalDayOfCurrentMonth === 31){
          this.week5 = this.week4 + 3;
          this.week6 = 0;
          this.week1NextMonth = 7 - 3;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 30){
          this.week5 = this.week4 + 2;
          this.week6 = 0;
          this.week1NextMonth = 7 - 2;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 28){
          this.week5 = 0;
          this.week6 = 0;
          this.week1NextMonth = 7;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 29){
          this.week5 = this.week4 + 1;
          this.week6 = 0;
          this.week1NextMonth = 7 - 1;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        break;

      case this.firstDayInCurrentMonth === dateOfWeek.MONDAY:
        this.week1 = 6;
        this.week2 = this.week1 + 7;
        this.week3 = this.week2 + 7;
        this.week4 = this.week3 + 7;
        this.dayOfPreviousMonth = 1;
        if(this.totalDayOfCurrentMonth === 31){
          this.week5 = this.week4 + 4;
          this.week6 = 0;
          this.week1NextMonth = 7 - 4;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 30){
          this.week5 = this.week4 + 3;
          this.week6 = 0;
          this.week1NextMonth = 7 - 3;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 28){
          this.week5 = this.week4 + 1;
          this.week6 = 0;
          this.week1NextMonth = 7 - 1;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 29){
          this.week5 = this.week4 + 2;
          this.week6 = 0;
          this.week1NextMonth = 7 - 2;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        break;

      case this.firstDayInCurrentMonth === dateOfWeek.TUESDAY:
        this.week1 = 5;
        this.week2 = this.week1 + 7;
        this.week3 = this.week2 + 7;
        this.week4 = this.week3 + 7;
        this.dayOfPreviousMonth = 2;
        if(this.totalDayOfCurrentMonth === 31){
          this.week5 = this.week4 + 5;
          this.week6 = 0;
          this.week1NextMonth = 7 - 5;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 30){
          this.week5 = this.week4 + 4;
          this.week6 = 0;
          this.week1NextMonth = 7 - 4;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 28){
          this.week5 = this.week4 + 2;
          this.week6 = 0;
          this.week1NextMonth = 7 - 2;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 29){
          this.week5 = this.week4 + 3;
          this.week6 = 0;
          this.week1NextMonth = 7 - 3;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        break;

      case this.firstDayInCurrentMonth === dateOfWeek.WEDNESDAY:
        this.week1 = 4;
        this.week2 = this.week1 + 7;
        this.week3 = this.week2 + 7;
        this.week4 = this.week3 + 7;
        this.dayOfPreviousMonth = 3;
        if(this.totalDayOfCurrentMonth === 31){
          this.week5 = this.week4 + 6;
          this.week6 = 1;
          this.week1NextMonth = 7 - 6;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 30){
          this.week5 = this.week4 + 5;
          this.week6 = 2;
          this.week1NextMonth = 7 - 5;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 28){
          this.week5 = this.week4 + 3;
          this.week6 = 0;
          this.week1NextMonth = 7 - 3;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 29){
          this.week5 = this.week4 + 4;
          this.week6 = 0;
          this.week1NextMonth = 7 - 4;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        break;

      case this.firstDayInCurrentMonth === dateOfWeek.THURSDAY:
        this.week1 = 3;
        this.week2 = this.week1 + 7;
        this.week3 = this.week2 + 7;
        this.week4 = this.week3 + 7;
        this.dayOfPreviousMonth = 4;
        if(this.totalDayOfCurrentMonth === 31){
          this.week5 = this.week4 + 7;
          this.week6 = 0;
          this.week1NextMonth = 0;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 30){
          this.week5 = this.week4 + 6;
          this.week6 = 0;
          this.week1NextMonth = 7 - 6;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 28){
          this.week5 = this.week4 + 4;
          this.week6 = 0;
          this.week1NextMonth = 7 - 4;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 29){
          this.week5 = this.week4 + 5;
          this.week6 = 0;
          this.week1NextMonth = 7 - 5;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        break;

      case this.firstDayInCurrentMonth === dateOfWeek.FRIDAY:
        this.week1 = 2;
        this.week2 = this.week1 + 7;
        this.week3 = this.week2 + 7;
        this.week4 = this.week3 + 7;
        this.dayOfPreviousMonth = 5;
        if(this.totalDayOfCurrentMonth === 31){
          this.week5 = this.week4 + 7;
          this.week6 = 1;
          this.week1NextMonth = 0;
          this.week2NextMonth = this.week1NextMonth + 6;
        }
        else if(this.totalDayOfCurrentMonth === 30){
          this.week5 = this.week4 + 7;
          this.week6 = 0;
          this.week1NextMonth = 0;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 28){
          this.week5 = this.week4 + 5;
          this.week6 = 0;
          this.week1NextMonth = 7 - 5;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 29){
          this.week5 = this.week4 + 6;
          this.week6 = 0;
          this.week1NextMonth = 7 - 6;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        break;

      default:
        this.week1 = 1;
        this.week2 = this.week1 + 7;
        this.week3 = this.week2 + 7;
        this.week4 = this.week3 + 7;
        this.dayOfPreviousMonth = 6;
        if(this.totalDayOfCurrentMonth === 31){
          this.week5 = this.week4 + 7;
          this.week6 = 2;
          this.week1NextMonth = 0;
          this.week2NextMonth = this.week1NextMonth + 5;
        }
        else if(this.totalDayOfCurrentMonth === 30){
          this.week5 = this.week4 + 7;
          this.week6 = 1;
          this.week1NextMonth = 0;
          this.week2NextMonth = this.week1NextMonth + 6;
        }
        else if(this.totalDayOfCurrentMonth === 28){
          this.week5 = this.week4 + 6;
          this.week6 = 0;
          this.week1NextMonth = 7 - 6;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 29){
          this.week5 = this.week4 + 7;
          this.week6 = 0;
          this.week1NextMonth = 0;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        break;
    }
      console.log(this.week1);


  }

  counter(i: number, week: string) {
    var array = new Array();
    let index = 1;

    if(week !== 'week1'){
      switch (true) {
        case week === 'week2':
          index = this.week1 + 1;
          break;
        case week === 'week3':
          index = this.week2 + 1;
          break;
        case week === 'week4':
          index = this.week3 + 1;
          break;
        case week === 'week5':
        index = this.week4 + 1;
        break;
        default:
          index = this.week5 + 1;
          break;
      }
    }

    for (index; index <= i; index++) {
      array.push(index);

    }

    if(this.week1NextMonth > 1 && week === 'week5'){
      for (let i = 1; i <= this.week1NextMonth; i++) {
          array.push(i);
      }
    }

    if(this.week2NextMonth > 1 && week === 'week6'){
      for (let i = this.week1NextMonth+1; i <= this.week2NextMonth; i++) {
          array.push(i);
      }
    }
    return array;
  }

}
