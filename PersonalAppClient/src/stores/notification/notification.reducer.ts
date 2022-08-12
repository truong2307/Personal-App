import { NotificationModel } from "src/shared/model/notification.interface";
import { NotificationState } from "./notification.state";

import * as NotificationAction from "./notification.action"

const initialState : NotificationState = {
  items : [] as NotificationModel[],
  error : '',
}

export function notificationReducer(
  state: NotificationState = initialState,
  action: NotificationAction.NotificationAction
  ) : NotificationState {
    switch (action.type) {
      case NotificationAction.GET_NOTIFICATIONS_SUCCESS:
      return {...state, items: action.items}
      case NotificationAction.NOTIFICATION_NEWEST:
      return {...state, items: [action.item, ...state.items]}
      default:
        return state;
    }
  }
