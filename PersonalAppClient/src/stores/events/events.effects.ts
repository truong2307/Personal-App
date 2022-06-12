import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { catchError, map, of, switchMap } from "rxjs";
import { EventsService } from "src/services/events.service";
import { tap } from 'rxjs/operators';
import { ResponseService } from "src/shared/model/response.interface";

import * as eventAction from "./events.action"
import { NgxUiLoaderService } from "ngx-ui-loader";
import { EventCalendar } from "src/shared/model/Event.interface";
import { Router } from "@angular/router";

@Injectable()
export class EventEffects {

  events: EventCalendar[] = [];

  constructor(
    private action$: Actions,
    private service: EventsService,
    private toastr: ToastrService,
    private loader: NgxUiLoaderService,
    private router: Router,
    ){
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
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/admin/calendar'])
        }),
        catchError(error =>
          of(new eventAction.CrudEventFailedAction(error)))
      )
    )
  ),
  { dispatch: false })

  getEventsSuccessAction$ = createEffect(() =>
  this.action$.pipe(
    ofType(eventAction.GET_EVENTS_SUCCESS),
    tap(() => {
      this.loader.stop();
    })
  ),
  { dispatch: false }
  )

  crudEventFailedAction$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.CRUD_EVENT_FAILED),
    tap((error) => {
      this.loader.stop();
      this.toastr.error(
        'error'
      )
    })
  ),
    { dispatch: false }
  );

  crudEventSuccessAction$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.CRUD_EVENT_SUCCESS),
    tap((error) => {
      this.loader.stop();
      this.toastr.success(
        'Success'
      )
    })
  ),
    { dispatch: false }
  );

}
