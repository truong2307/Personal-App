import { Action } from "@ngrx/store";
import { EventCalendar } from "src/shared/model/Event.interface";

export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILED = 'GET_EVENTS_FAILED';
export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILED = 'CREATE_EVENT_FAILED';
export const GET_EVENT = 'GET_EVENT';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_FAILED = 'GET_EVENT_FAILED';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAILED = 'UPDATE_EVENT_FAILED';
export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILED = 'DELETE_EVENT_FAILED';

export class GetEventsAction implements Action{
  readonly type = GET_EVENTS;
}

export class GetEventsSuccessAction implements Action{
  readonly type = GET_EVENTS_SUCCESS;
  constructor(public events: EventCalendar[]){}
}

export class GetEventsFailedAction implements Action{
  readonly type = GET_EVENTS_FAILED;
  constructor(public error: string){}
}

export class CreateEventAction implements Action{
  readonly type = CREATE_EVENT;
  constructor(public event: EventCalendar){}
}

export class CreateEventSuccessAction implements Action{
  readonly type = CREATE_EVENT_SUCCESS;
}

export class CreateEventFailedAction implements Action{
  readonly type = CREATE_EVENT_FAILED;
  constructor(public error: string){}
}

export class GetEventAction implements Action{
  readonly type = GET_EVENT;
  constructor(public id: number){}
}

export class GetEventSuccessAction implements Action{
  readonly type = GET_EVENT_SUCCESS;
  constructor(public event: EventCalendar){}
}

export class GetEventFailedAction implements Action{
  readonly type = GET_EVENT_FAILED;
  constructor(public error: string){}
}

export class UpdateEventAction implements Action{
  readonly type = UPDATE_EVENT;
  constructor(public event: EventCalendar){}
}

export class UpdateEventSuccessAction implements Action{
  readonly type = UPDATE_EVENT_SUCCESS;
}

export class UpdateEventFailedAction implements Action{
  readonly type = UPDATE_EVENT_FAILED;
  constructor(public error: string){}
}

export class DeleteEventAction implements Action{
  readonly type = DELETE_EVENT;
  constructor(public id: number){}
}

export class DeleteEventSuccessAction implements Action{
  readonly type = DELETE_EVENT_SUCCESS;
}

export class DeleteEventFailedAction implements Action{
  readonly type = DELETE_EVENT_FAILED;
  constructor(public error: string){}
}

export type EventAction =
| GetEventsAction
| GetEventsSuccessAction
| GetEventsFailedAction
| GetEventAction
| GetEventSuccessAction
| GetEventFailedAction
| CreateEventAction
| CreateEventFailedAction
| CreateEventSuccessAction
| UpdateEventAction
| UpdateEventSuccessAction
| UpdateEventFailedAction
| DeleteEventAction
| DeleteEventSuccessAction
| DeleteEventFailedAction
