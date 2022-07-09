import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSideRoutingModule } from './admin-side-routing.module';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GuardAdminSide } from 'src/guard/guard.admin';
import { AddEventComponent } from './calendar/add-event/add-event.component';

//Material module
import { MaterialExampleModule } from 'src/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { TranslateModule } from '@ngx-translate/core';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { EditUserComponent } from './manage-user/edit-user/edit-user.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    AddEventComponent,
    ManageUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminSideRoutingModule,
    FormsModule,
    SharedModule,
    MaterialExampleModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    TranslateModule,
  ],
  providers: [GuardAdminSide],
})
export class AdminSideModule { }
