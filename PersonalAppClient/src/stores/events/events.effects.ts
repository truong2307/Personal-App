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
import { select, Store } from "@ngrx/store";
import { eventSelector } from "./events.selector";
import { NgxUiLoaderService } from "ngx-ui-loader";


@Injectable()
export class EventEffects {

  events: Array<EventCalendar> = [];

  constructor(
    private action$: Actions,
    private service: EventsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private loader: NgxUiLoaderService,
    private store: Store,
    ){
      this.store.pipe(select(eventSelector)).subscribe(
        result => {
        this.events = result.items.map((c : any) => ({...c}));
      })

  }

  getEvents$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.GET_EVENTS),
    switchMap(() => {
        this.loader.start();
        return this.service.getEvents().pipe(
          map((results : ResponseData) => {

            return new eventAction.GetEventsSuccessAction(results.result);
          }),
          catchError(error =>
            of(new eventAction.CrudEventFailedAction(error))
          )
        )
      }

    )
  ));

  createEventAction$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.CREATE_EVENT),
    switchMap((event : any) =>
      this.service.addEvent(event.event).pipe(
        map(result => {
          this.toastr.success(
            this.translate.instant('calendar.AddEventSuccess')
          )
          this.events.push(result.result);
          return new eventAction.CrudEventSuccessAction(this.events);
        }),
        catchError(error =>
          of(new eventAction.CrudEventFailedAction(error)))
      )
    )
  ),
  )

  deleteEvent$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.DELETE_EVENT),
    switchMap((event : any) =>
      this.service.deleteEvents(event.id).pipe(
        map(result => {
          if(result.isSuccess){
            this.toastr.error(
              this.translate.instant('calendar.RemoveEventSuccess')
            )
          }

          const index = this.events.findIndex(c => c.id === event.id);
          this.events.splice(index, 1);
          return new eventAction.CrudEventSuccessAction(this.events);
        }),
        catchError(error =>
          of(new eventAction.CrudEventFailedAction(error)))
      )
    )
  ),
  )

  updateEvent$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.UPDATE_EVENT),
    switchMap((event : any) => this.service.updateEvents(event.event).pipe(
      map(result => {
        if(result.isSuccess){
          this.toastr.success(
            this.translate.instant('calendar.UpdateEventSuccess')
          )
        }
        const index = this.events.findIndex(c => c.id === event.event.id);
        this.events[index] = event.event;

        return new eventAction.CrudEventSuccessAction(this.events);
      }),
      catchError(error =>
        of(new eventAction.CrudEventFailedAction(error)
        )
        )
    )),
  ),
  )

  crudEventFailedAction$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.CRUD_EVENT_FAILED),
    tap((error) => {
      this.loader.stop();
      this.toastr.error(
        this.translate.instant('common.Error')
      );
    })
  ),
    { dispatch: false }
  );

  getEventSuccessAction$ = createEffect(() => this.action$.pipe(
    ofType(eventAction.GET_EVENTS_SUCCESS),
    tap(() => {
      this.loader.stop();
    })
  ),
    { dispatch: false }
  );
}
