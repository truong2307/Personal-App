import { Component, OnInit } from '@angular/core';
import dateOfWeek from 'src/shared/const/dateOfWeek';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private days : Array<string>;

  constructor() {
    this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  }

  ngOnInit(): void {
    this.renderCalendar();
  }

  renderCalendar() : void{
    const date = new Date();
    const totalDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
    const totalDayOfPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayInCurrentMonth = this.days[new Date(date.getFullYear(), date.getMonth(), 1).getDay()];

    var week1;
    var week2;
    var week3;
    var week4;
    var week5;
    var week6;
    var week1NextMonth;
    var week2NextMonth;
    var dayOfPreviousMonth

    switch (true) {

      case firstDayInCurrentMonth === dateOfWeek.SUNDAY:
        week1 = 7;
        week2 = week1 + 7;
        week3 = week2 + 7;
        week4 = week3 + 7;
        dayOfPreviousMonth = 0;
        if(totalDayOfCurrentMonth === 31){
          week5 = week4 + 3;
          week6 = 0;
          week1NextMonth = 7 - 3;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 30){
          week5 = week4 + 2;
          week6 = 0;
          week1NextMonth = 7 - 2;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 28){
          week5 = 0;
          week6 = 0;
          week1NextMonth = 7;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 29){
          week5 = week4 + 1;
          week6 = 0;
          week1NextMonth = 7 - 1;
          week2NextMonth = week1NextMonth + 7;
        }
        break;

      case firstDayInCurrentMonth === dateOfWeek.MONDAY:
        week1 = 6;
        week2 = week1 + 7;
        week3 = week2 + 7;
        week4 = week3 + 7;
        dayOfPreviousMonth = 1;
        if(totalDayOfCurrentMonth === 31){
          week5 = week4 + 4;
          week6 = 0;
          week1NextMonth = 7 - 4;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 30){
          week5 = week4 + 3;
          week6 = 0;
          week1NextMonth = 7 - 3;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 28){
          week5 = week4 + 1;
          week6 = 0;
          week1NextMonth = 7 - 1;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 29){
          week5 = week4 + 2;
          week6 = 0;
          week1NextMonth = 7 - 2;
          week2NextMonth = week1NextMonth + 7;
        }
        break;

      case firstDayInCurrentMonth === dateOfWeek.TUESDAY:
        week1 = 5;
        week2 = week1 + 7;
        week3 = week2 + 7;
        week4 = week3 + 7;
        dayOfPreviousMonth = 2;
        if(totalDayOfCurrentMonth === 31){
          week5 = week4 + 5;
          week6 = 0;
          week1NextMonth = 7 - 5;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 30){
          week5 = week4 + 4;
          week6 = 0;
          week1NextMonth = 7 - 4;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 28){
          week5 = week4 + 2;
          week6 = 0;
          week1NextMonth = 7 - 2;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 29){
          week5 = week4 + 3;
          week6 = 0;
          week1NextMonth = 7 - 3;
          week2NextMonth = week1NextMonth + 7;
        }
        break;

      case firstDayInCurrentMonth === dateOfWeek.WEDNESDAY:
        week1 = 4;
        week2 = week1 + 7;
        week3 = week2 + 7;
        week4 = week3 + 7;
        dayOfPreviousMonth = 3;
        if(totalDayOfCurrentMonth === 31){
          week5 = week4 + 6;
          week6 = 1;
          week1NextMonth = 7 - 6;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 30){
          week5 = week4 + 5;
          week6 = 2;
          week1NextMonth = 7 - 5;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 28){
          week5 = week4 + 3;
          week6 = 0;
          week1NextMonth = 7 - 3;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 29){
          week5 = week4 + 4;
          week6 = 0;
          week1NextMonth = 7 - 4;
          week2NextMonth = week1NextMonth + 7;
        }
        break;

      case firstDayInCurrentMonth === dateOfWeek.THURSDAY:
        week1 = 3;
        week2 = week1 + 7;
        week3 = week2 + 7;
        week4 = week3 + 7;
        dayOfPreviousMonth = 4;
        if(totalDayOfCurrentMonth === 31){
          week5 = week4 + 7;
          week6 = 0;
          week1NextMonth = 0;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 30){
          week5 = week4 + 6;
          week6 = 0;
          week1NextMonth = 7 - 6;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 28){
          week5 = week4 + 4;
          week6 = 0;
          week1NextMonth = 7 - 4;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 29){
          week5 = week4 + 5;
          week6 = 0;
          week1NextMonth = 7 - 5;
          week2NextMonth = week1NextMonth + 7;
        }
        break;

      case firstDayInCurrentMonth === dateOfWeek.FRIDAY:
        week1 = 2;
        week2 = week1 + 7;
        week3 = week2 + 7;
        week4 = week3 + 7;
        dayOfPreviousMonth = 5;
        if(totalDayOfCurrentMonth === 31){
          week5 = week4 + 7;
          week6 = 1;
          week1NextMonth = 0;
          week2NextMonth = week1NextMonth + 6;
        }
        else if(totalDayOfCurrentMonth === 30){
          week5 = week4 + 7;
          week6 = 0;
          week1NextMonth = 0;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 28){
          week5 = week4 + 5;
          week6 = 0;
          week1NextMonth = 7 - 5;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 29){
          week5 = week4 + 6;
          week6 = 0;
          week1NextMonth = 7 - 6;
          week2NextMonth = week1NextMonth + 7;
        }
        break;

      default:
        week1 = 1;
        week2 = week1 + 7;
        week3 = week2 + 7;
        week4 = week3 + 7;
        dayOfPreviousMonth = 6;
        if(totalDayOfCurrentMonth === 31){
          week5 = week4 + 7;
          week6 = 2;
          week1NextMonth = 0;
          week2NextMonth = week1NextMonth + 5;
        }
        else if(totalDayOfCurrentMonth === 30){
          week5 = week4 + 7;
          week6 = 1;
          week1NextMonth = 0;
          week2NextMonth = week1NextMonth + 6;
        }
        else if(totalDayOfCurrentMonth === 28){
          week5 = week4 + 6;
          week6 = 0;
          week1NextMonth = 7 - 6;
          week2NextMonth = week1NextMonth + 7;
        }
        else if(totalDayOfCurrentMonth === 29){
          week5 = week4 + 7;
          week6 = 0;
          week1NextMonth = 0;
          week2NextMonth = week1NextMonth + 7;
        }
        break;
    }

    console.log({
      week1, week2,week3,week4,week5,week6,week1NextMonth,week2NextMonth
    });

  }




}
