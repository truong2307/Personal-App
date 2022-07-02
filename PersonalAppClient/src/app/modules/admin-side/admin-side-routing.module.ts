import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardAdminSide } from 'src/guard/guard.admin';
import { AdminSideComponent } from './admin-side.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [
  {
    path: '', component:AdminSideComponent,
    canActivate : [GuardAdminSide],

    children:[
      {
        path: '', component: HomeComponent,
      },
      {
        path: 'calendar', component: CalendarComponent,
      },
      {
        path: 'manageUser', component: ManageUserComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSideRoutingModule { }
