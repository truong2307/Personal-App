import { Component, OnInit } from '@angular/core';
import dateOfWeek,
  { daysOfWeek
  , daysOfWeekRender, daysOfWeekViRender, month
  , monthVi } from 'src/shared/const/dateOfWeek';
import { AddEventComponent } from './add-event/add-event.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { GetEventsAction } from 'src/stores/events/events.action';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { eventSelector } from '../../../../stores/events/events.selector';
import {EventCalendar} from '../../../../shared/model/Event.interface'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events: Array<EventCalendar> = [];
  days : Array<string> = [];
  daysRender : Array<string> = [];
  month : Array<string> = [];
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
  oldDay: boolean = false;

  today : number = this.dateCurrent.getDate();
  currentMonth : number = this.dateCurrent.getMonth() + 1;
  currentYear : number = this.dateCurrent.getFullYear();

  anotherMonth : number = 0;
  anotherYear : number = 0;
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private store: Store,
    private loader: NgxUiLoaderService,
    private translate: TranslateService
  ) {
      this.days = daysOfWeek;
      this.daysRender = this.translate.currentLang === 'en' ? daysOfWeekRender : daysOfWeekViRender;
      this.month = this.translate.currentLang === 'en' ? month : monthVi;
      this.currentMonthSelectName = this.month[this.currentMonthIsSelecting];

      this.translate.onLangChange.subscribe(value => {
        this.daysRender = value.lang === 'en' ? daysOfWeekRender : daysOfWeekViRender;
        this.month = value.lang === 'en' ? month : monthVi;
        this.currentMonthSelectName = this.month[this.currentMonthIsSelecting];
    })
  }

   ngOnInit() {
    this.store.dispatch(new GetEventsAction());
    this.store.pipe(select(eventSelector)).subscribe(
      result => {
        this.events = result.items
      }
    );
    this.currentMonthSelectName = this.month[this.currentMonthIsSelecting];
    this.renderCalendar(this.currentYearIsSelecting, this.currentMonthIsSelecting);
  }

  renderCalendar(year: number, month: number) : void{
    this.totalDayOfCurrentMonth = new Date(year, month + 1, 0).getDate();
    this.totalDayOfPreviousMonth = new Date(year, month, 0).getDate();
    this.firstDayInCurrentMonth = this.days[new Date(year, month, 1).getDay()];
    this.anotherMonth = month + 1;
    this.anotherYear = year;

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

    if(this.week1 < 7 && week === 'week1InPreviousMonth'){
      for (let i = this.totalDayOfPreviousMonth - (6 - this.week1); i <= this.totalDayOfPreviousMonth; i++) {
        array.push(i);
      }
    }

    for (index; index <= i; index++) {
      array.push(index);
    }

    if(this.week1NextMonth >= 1 && week === 'week1NextMonth'){
      for (let i = 1; i <= this.week1NextMonth; i++) {
          array.push(i);
      }
    }

    if(this.week2NextMonth >= 1 && week === 'week2NextMonth'){
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

  createEvent(day?: any, month?: any, year?: any, eventEle?: any){
    const checkOldDay = eventEle?.currentTarget?.classList.contains('disable-event-day');

    if (eventEle?.target !== eventEle?.currentTarget || checkOldDay) return;
    if(month === 13){
      month = 1;
      year += 1;
    } else if(month === 0){
      month = 12;
      year -= 1;
    }

    const modalRef = this.modalService.open(AddEventComponent, {size: 'md'});
    var buildDate = year+'-'+month+'-'+day;
    modalRef.componentInstance.initialDate = buildDate;
  }

  checkOldDay(day?: any, month?: any, year?: any) : boolean{
    if(month === 13){
      month = 1;
      year += 1;
    } else if(month === 0){
      month = 12;
      year -= 1;
    }

    const currentDate = (new Date()).setHours(0,0,0,0);
    var buildDate = year+'-'+month+'-'+day;
    const dayCheck = (new Date(buildDate)).setHours(0,0,0,0);
    if(dayCheck < currentDate){
      return true;
    }

    return false;
  }

  eventToRender(year: number, month: number, day: any) {
    if(month === 13){
      month = 1;
      year += 1;
    } else if(month === 0){
      month = 12;
      year -= 1;
    }

    var buildCurrentDay = `${year}-${month}-${day}`;
    var listEvent : EventCalendar[] = [];
    var currDate = new Date(buildCurrentDay).setHours(0,0,0,0);
    var currDate = new Date(buildCurrentDay).setHours(0,0,0,0);
    this.events.forEach((item) => {
      var startDate = new Date(item.startDate).setHours(0,0,0,0);
      var endDate = new Date(item.endDate).setHours(0,0,0,0);

      if(startDate === endDate){
        if(currDate === startDate){
          listEvent.push(item)
        }
      }
      else if(currDate >= startDate && currDate<= endDate){
        listEvent.push(item)
      }
    })

    return listEvent;
  }

  editEvent(data: EventCalendar, eventEle?: any){
    this.oldDay = eventEle.currentTarget.offsetParent.className.includes('disable-event-day');

    const modalRef = this.modalService.open(AddEventComponent, {size: 'md'});
    modalRef.componentInstance.isEdit = true;
    modalRef.componentInstance.initialEvent = data;
    modalRef.componentInstance.isOldDay = this.oldDay;
  }

}
