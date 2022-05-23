import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSideRoutingModule } from './admin-side-routing.module';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    AdminSideRoutingModule
  ]
})
export class AdminSideModule { }
