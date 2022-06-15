import { Action } from "@ngrx/store";
import { EventCalendar } from "src/shared/model/Event.interface";

export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const GET_EVENT = 'GET_EVENT';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const CRUD_EVENT_SUCCESS = 'CRUD_EVENT_SUCCESS';
export const CRUD_EVENT_FAILED = 'CRUD_EVENT_FAILED';

export class GetEventsAction implements Action{
  readonly type = GET_EVENTS;
}

export class GetEventsSuccessAction implements Action{
  readonly type = GET_EVENTS_SUCCESS;
  constructor(public events: EventCalendar[]){}
}

export class GetEventAction implements Action{
  readonly type = GET_EVENT;
  constructor(public id: number){}
}

export class GetEventSuccessAction implements Action{
  readonly type = GET_EVENT_SUCCESS;
  constructor(public event: EventCalendar){}
}

export class CreateEventAction implements Action{
  readonly type = CREATE_EVENT;
  constructor(public event: EventCalendar){}
}

export class CreateEventSuccessAction implements Action{
  readonly type = CREATE_EVENT_SUCCESS;
  constructor(public events: EventCalendar[]){}
}

export class UpdateEventAction implements Action{
  readonly type = UPDATE_EVENT;
  constructor(public event: EventCalendar){}
}

export class DeleteEventAction implements Action{
  readonly type = DELETE_EVENT;
  constructor(public id: number){}
}

export class CrudEventSuccessAction implements Action{
  readonly type = CRUD_EVENT_SUCCESS;
}

export class CrudEventFailedAction implements Action{
  readonly type = CRUD_EVENT_FAILED;
  constructor(public error: string){}
}

export type EventAction =
| GetEventsAction
| GetEventsSuccessAction
| GetEventAction
| GetEventSuccessAction
| CreateEventAction
| UpdateEventAction
| DeleteEventAction
| CrudEventFailedAction
| CrudEventSuccessAction
| CreateEventSuccessAction
