import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { MaterialExampleModule } from './material/material.module';



@NgModule({
  declarations: [
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialExampleModule,
  ],
  exports: [
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
