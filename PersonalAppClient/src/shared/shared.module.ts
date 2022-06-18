import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
  ]
})
export class SharedModule { }
