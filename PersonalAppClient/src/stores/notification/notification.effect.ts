import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr/toastr/toastr.service";
import { catchError, map, of, switchMap } from "rxjs";
import { NotificationsService } from "src/services/notifications.service";
import { ResponseDatas } from "src/shared/model/ResponseData.interface";
import { tap } from 'rxjs/operators';

import * as notificationAction from "./notification.action"
import { TranslateService } from "@ngx-translate/core";
@Injectable()
export class NotificationEffects {
 constructor(
  private action$: Actions,
  private service: NotificationsService,
  private toastr: ToastrService,
  private translate: TranslateService,
 ) {}

  getNotifications$ = createEffect(() => this.action$.pipe(
    ofType(notificationAction.GET_NOTIFICATIONS),
    switchMap(() =>
    this.service.getNotifications().pipe(
      map((result: ResponseDatas) => {
        return new notificationAction.GetNotificationsSuccessAction(result.datas);
      }),
      catchError(error =>
        of(new notificationAction.FetchNotificationError(error)))
    ))
  ));

  fetchNotificationError$ = createEffect(() => this.action$.pipe(
    ofType(notificationAction.FETCH_NOTIFICATION_ERROR),
    tap((error) => {
      this.toastr.error(
        this.translate.instant('common.Error')
      )
    })
  ),
  { dispatch: false })
}
