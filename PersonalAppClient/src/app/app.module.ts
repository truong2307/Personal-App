import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AdminSideComponent } from './modules/admin-side/admin-side.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './stores/auth/auth.module';
import { SidebarComponent } from 'src/shared/components/sidebar/sidebar.component';
import { LoginComponent } from 'src/shared/components/login/login.component';
import { GuardAdminSide } from './guard/guard.admin';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    AdminSideComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    AuthModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter : tokenGetter,
        }
      }),
  ],
  providers: [GuardAdminSide],
  bootstrap: [AppComponent]
})
export class AppModule { }
