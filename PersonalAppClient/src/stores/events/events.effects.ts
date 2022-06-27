import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { catchError, map, of, switchMap } from "rxjs";
import { EventsService } from "src/services/events.service";
import { tap } from 'rxjs/operators';

import * as eventAction from "./events.action"
import { EventCalendar } from "src/shared/model/Event.interface";
import { TranslateService } from "@ngx-translate/core";
import { ResponseData } from "src/shared/model/ResponseData.interface";


@Injectable()
export class EventEffects {

  events: EventCalendar[] = [];

  constructor(
    private action$: Actions,
    private service: EventsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    ){
  }

  getEvents$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.GET_EVENTS),
    switchMap(() =>
      this.service.getEvents().pipe(
        map((results : ResponseData) => {
          return new eventAction.GetEventsSuccessAction(results.result);
        }),
        catchError(error =>
          of(new eventAction.CrudEventFailedAction(error))
        )
      )
    )
  ));

  createEventAction$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.CREATE_EVENT),
    switchMap((event) =>
      this.service.addEvent(event['event']).pipe(
        tap((result) => {
          this.toastr.success(
            this.translate.instant('calendar.AddEventSuccess')
          )
        }),
        catchError(error =>
          of(new eventAction.CrudEventFailedAction(error)))
      )
    )
  ),
  { dispatch: false }
  )

  deleteEvent$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.DELETE_EVENT),
    switchMap((event) =>
      this.service.deleteEvents(event['id']).pipe(
        tap((result) => {
          if(result.isSuccess){
            this.toastr.success(
              this.translate.instant('calendar.RemoveEventSuccess')
            )
          }
        }),
        catchError(error =>
          of(new eventAction.CrudEventFailedAction(error)))
      )
    )
  ),
  { dispatch: false }
  )

  updateEvent$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.UPDATE_EVENT),
    switchMap((event) => this.service.updateEvents(event['event']).pipe(
      tap(result => {
        if(result.isSuccess){
          this.toastr.success(
            this.translate.instant('calendar.UpdateEventSuccess')
          )
        }
      })
    )),
    catchError(error =>
      of(new eventAction.CrudEventFailedAction(error)))
  ),
  { dispatch: false }
  )

  crudEventFailedAction$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.CRUD_EVENT_FAILED),
    tap((error) => {
      this.toastr.error(
        this.translate.instant('common.Error')
      )
    })
  ),
    { dispatch: false }
  );

  crudEventSuccessAction$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.CRUD_EVENT_SUCCESS),
    tap((error) => {
      this.toastr.success(
        this.translate.instant('common.Success')
      )
    })
  ),
    { dispatch: false }
  );

}
