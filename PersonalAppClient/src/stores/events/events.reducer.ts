import { EventCalendar } from "src/shared/model/Event.interface";
import { EventState } from "./events.state";

import * as EventAction from "./events.action"

const initialState : EventState = {
  idEvent: -1,
  items: [],
  item : {} as EventCalendar,
  error : '',
};

export function eventReducer(
  state: EventState = initialState,
  action: EventAction.EventAction
): EventState {
  switch (action.type) {
    case EventAction.GET_EVENTS:
      return {...state};
    case EventAction.GET_EVENTS_SUCCESS:
      return {...state, items: action.events};
    case EventAction.CREATE_EVENT:
      return {...state};
    case EventAction.GET_EVENT:
      return {...state, idEvent: action.id};
    case EventAction.GET_EVENT_SUCCESS:
      return {...state, item: action.event};
    case EventAction.UPDATE_EVENT:
      return {...state, item: action.event};
    case EventAction.DELETE_EVENT:
      return {...state, idEvent: action.id};
    case EventAction.CRUD_EVENT_SUCCESS:
      return {...state, items: action.events};
    case EventAction.CRUD_EVENT_FAILED:
      return {...state, error : action.error};
    default:
      return state;
  }
}
