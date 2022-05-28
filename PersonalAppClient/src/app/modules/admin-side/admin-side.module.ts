import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSideRoutingModule } from './admin-side-routing.module';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GuardAdminSide } from 'src/app/guard/guard.admin';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    AdminSideRoutingModule,
  ],
  providers: [GuardAdminSide],
})
export class AdminSideModule { }
