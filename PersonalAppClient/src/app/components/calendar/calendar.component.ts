import { Component, OnInit } from '@angular/core';
import dateOfWeek from 'src/shared/const/dateOfWeek';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private days : Array<string>;
  private month : Array<string>;
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
  dateCurrent : Date = new Date();
  currentMonthIsSelecting: number = this.dateCurrent.getMonth();
  currentYearIsSelecting: number = this.dateCurrent.getFullYear();
  currentMonthSelectName: string = '';


  constructor(
  ) {
    this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // this.month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.month = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
  }

  ngOnInit(): void {
    this.currentMonthSelectName = this.month[this.currentMonthIsSelecting];
    this.renderCalendar(this.currentYearIsSelecting, this.currentMonthIsSelecting);
    // this.renderCalendar(this.currentYearIsSelecting + 1 , 2);
  }

  renderCalendar(year: number, month: number) : void{
    this.totalDayOfCurrentMonth = new Date(year, month + 1, 0).getDate();
    this.totalDayOfPreviousMonth = new Date(year, month, 0).getDate();
    this.firstDayInCurrentMonth = this.days[new Date(year, month, 1).getDay()];

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
          this.week6 = 0;
          this.week1NextMonth = 7 - 6;
          this.week2NextMonth = this.week1NextMonth + 7;
        }
        else if(this.totalDayOfCurrentMonth === 30){
          this.week5 = this.week4 + 5;
          this.week6 = 0;
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
          this.week6 = this.week5 + 1;
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
          this.week6 = this.week5 + 2;
          this.week1NextMonth = 0;
          this.week2NextMonth = this.week1NextMonth + 5;
        }
        else if(this.totalDayOfCurrentMonth === 30){
          this.week5 = this.week4 + 7;
          this.week6 = this.week5 + 1;
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

    if(this.week1 < 7 && week === 'week1'){
      for (let i = this.totalDayOfPreviousMonth - (6 - this.week1); i <= this.totalDayOfPreviousMonth; i++) {
        array.push(i);
      }
    }

    for (index; index <= i; index++) {
      array.push(index);
    }

    if(this.week1NextMonth >= 1 && week === 'week5'){
      for (let i = 1; i <= this.week1NextMonth; i++) {
          array.push(i);
      }
    }

    if(this.week2NextMonth >= 1 && week === 'week6'){
      for (let i = this.week1NextMonth + 1; i <= this.week2NextMonth; i++) {
          array.push(i);
      }
    }

    return array;
  }

  previousMonth(){
    this.currentMonthIsSelecting -= 1;


    if(this.currentMonthIsSelecting === -1){
      this.currentMonthIsSelecting = 11;
      this.currentYearIsSelecting -= 1;
    }

    this.currentMonthSelectName = this.month[this.currentMonthIsSelecting];
    this.renderCalendar(this.currentYearIsSelecting, this.currentMonthIsSelecting);

  }

  nextMonth(){
    this.currentMonthIsSelecting += 1;

    if(this.currentMonthIsSelecting === 12){
      this.currentMonthIsSelecting = 0;
      this.currentYearIsSelecting += 1;
    }

    this.currentMonthSelectName = this.month[this.currentMonthIsSelecting];
    this.renderCalendar(this.currentYearIsSelecting, this.currentMonthIsSelecting);

  }

  backToCurrentDay(){
    let date = new Date();
    this.currentMonthIsSelecting = date.getMonth();
    this.currentYearIsSelecting = date.getFullYear();
    this.currentMonthSelectName = this.month[this.currentMonthIsSelecting];
    this.renderCalendar(this.currentYearIsSelecting, this.currentMonthIsSelecting);
  }
}
