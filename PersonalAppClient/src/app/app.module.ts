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
import { GuardAdminSide } from './guard/guard.admin';
import { JwtModule } from "@auth0/angular-jwt";
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/stores/auth/auth.module';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,

    AdminSideComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
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
      }
    ),
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule.forRoot({ showForeground: false }),
  ],
  providers: [GuardAdminSide],
  bootstrap: [AppComponent]
})
export class AppModule { }
