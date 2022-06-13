import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardAdminSide } from 'src/guard/guard.admin';
import { AdminSideComponent } from './admin-side.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component:AdminSideComponent,

    children:[
      {
        path: '', component: HomeComponent,
        canActivate : [GuardAdminSide],
      },
      {
        path: 'calendar', component: CalendarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSideRoutingModule { }
