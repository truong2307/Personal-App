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
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginationService } from 'src/services/custom-mat-pagination.service';
import { QuizzTopicModule } from 'src/stores/quizz-topic/quizz-topic.module';
import { QuizzManageModule } from 'src/stores/quizz-manage/quizz-manage.module';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    AdminSideComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
}),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    AuthModule,
    EventsModule,
    NotificationsModule,
    ManageUserModule,
    QuizzTopicModule,
    QuizzManageModule,
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
    NgxUiLoaderModule.forRoot({
      fgsColor: "rgba(174,142,204,0.74)",
      fgsType: "square-jelly-box",
      bgsType: "square-jelly-box",
      bgsColor: "rgba(174,142,204,0.74)",
      hasProgressBar: false,
      fgsSize: 40,
      bgsSize: 40,
      blur: 1,
    }),
    NgxUiLoaderRouterModule.forRoot(
      { showForeground: false }),
    MaterialExampleModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [GuardAdminSide,NgbActiveModal,{
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginationService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
