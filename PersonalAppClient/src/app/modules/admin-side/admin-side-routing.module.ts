import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardAdminSide } from 'src/guard/guard.admin';
import { AdminSideComponent } from './admin-side.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { QuizzManageComponent } from './quizz-manage/quizz-manage.component';
import { QuizzTopicComponent } from './quizz-topic/quizz-topic.component';

const routes: Routes = [
  {
    path: '', component:AdminSideComponent,
    children:[
      // {
      //   path: 'home', component: HomeComponent,
      //   canActivate : [GuardAdminSide],
      // },
      {
        path: '', component: CalendarComponent,
        canActivate : [GuardAdminSide],
      },
      {
        path: 'manageUser', component: ManageUserComponent,
        canActivate : [GuardAdminSide],
      },
      {
        path: 'quizzTopic', component: QuizzTopicComponent,
        canActivate : [GuardAdminSide],
      },
      {
        path: 'quizzManage', component: QuizzManageComponent,
        canActivate : [GuardAdminSide],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSideRoutingModule { }
