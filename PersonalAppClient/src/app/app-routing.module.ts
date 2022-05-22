import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CalendarComponent } from './components/admin/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo: "login", pathMatch: "full"
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin', component: AdminComponent, children :
    [
      {path: 'calendar', component: CalendarComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
