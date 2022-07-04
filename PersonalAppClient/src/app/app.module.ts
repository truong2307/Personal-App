import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AdminSideComponent } from './modules/admin-side/admin-side.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GuardAdminSide } from '../guard/guard.admin';
import { JwtModule } from "@auth0/angular-jwt";
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/stores/auth/auth.module';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { MaterialExampleModule } from 'src/shared/material/material.module';
import { environment } from 'src/environments/environment';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { EventsModule } from 'src/stores/events/events.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/services/translate-service.service';
import { NotificationsModule } from 'src/stores/notification/notification.module';
import { ManageUserModule } from 'src/stores/manage-user/manage-user.module';

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
    SharedModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    AuthModule,
    EventsModule,
    NotificationsModule,
    ManageUserModule,
    HttpClientModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter : tokenGetter,
          allowedDomains: [environment.allowDomain]
        }
      }
    ),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule.forRoot({ showForeground: false }),
    MaterialExampleModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [GuardAdminSide,NgbActiveModal,],
  bootstrap: [AppComponent]
})
export class AppModule { }
