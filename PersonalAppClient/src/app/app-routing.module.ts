import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/shared/components/login/login.component';
import { GuardAdminSide } from './guard/guard.admin';

const routes: Routes = [
  {
    path: '', redirectTo: "admin", pathMatch: "full"
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin-side/admin-side.module')
    .then(x => x.AdminSideModule),
    canLoad: [GuardAdminSide],
  },
  // {
  //   path: '**', component: LoginComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
