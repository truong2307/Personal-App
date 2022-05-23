import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo: "login", pathMatch: "full"
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin-side/admin-side.module')
    .then(x => x.AdminSideModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
