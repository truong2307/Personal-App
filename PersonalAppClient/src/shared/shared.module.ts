import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { MaterialExampleModule } from './material/material.module';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    HeaderComponent,
    SelectLanguageComponent,
    FooterComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialExampleModule,
  ],
  exports: [
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SelectLanguageComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
