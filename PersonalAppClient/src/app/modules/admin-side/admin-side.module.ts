import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSideRoutingModule } from './admin-side-routing.module';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GuardAdminSide } from 'src/app/guard/guard.admin';
import { AddEventComponent } from './calendar/add-event/add-event.component';

//Material module
import { MaterialExampleModule } from 'src/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    AddEventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminSideRoutingModule,
    FormsModule,
    MaterialExampleModule,
  ],
  providers: [GuardAdminSide],
})
export class AdminSideModule { }
