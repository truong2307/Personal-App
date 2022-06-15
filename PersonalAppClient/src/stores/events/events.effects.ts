import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { catchError, map, of, switchMap } from "rxjs";
import { EventsService } from "src/services/events.service";
import { tap } from 'rxjs/operators';
import { ResponseService } from "src/shared/model/response.interface";

import * as eventAction from "./events.action"
import { EventCalendar } from "src/shared/model/Event.interface";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { eventSelector } from './events.selector';


@Injectable()
export class EventEffects {

  events: EventCalendar[] = [];

  constructor(
    private action$: Actions,
    private service: EventsService,
    private toastr: ToastrService,
    private router: Router,
    private store: Store,
    ){
      this.store.pipe(select(eventSelector)).subscribe(
        result => {
          this.events = result.items
        }
      );
  }

  getEvents$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.GET_EVENTS),
    switchMap(() =>
      this.service.getEvents().pipe(
        map((results : ResponseService) => {
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
            'Add event success'
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
              'Delete event success'
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
            'Update event success'
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
        error
      )
    })
  ),
    { dispatch: false }
  );

  crudEventSuccessAction$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.CRUD_EVENT_SUCCESS),
    tap((error) => {
      this.toastr.success(
        'Success'
      )
    })
  ),
    { dispatch: false }
  );

}
