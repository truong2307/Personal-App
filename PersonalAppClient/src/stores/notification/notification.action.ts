import { Action } from "@ngrx/store";
import { NotificationModel } from "src/shared/model/Notification.interface";

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const SEEN_NOTIFICATION = 'SEEN_NOTIFICATION';
export const FETCH_NOTIFICATION_ERROR = 'FETCH_NOTIFICATION_ERROR';

export class GetNotificationsAction implements Action {
  readonly type = GET_NOTIFICATIONS;
}

export class GetNotificationsSuccessAction implements Action {
  readonly type = GET_NOTIFICATIONS_SUCCESS;
  constructor(public items: NotificationModel[]){}
}

export class SeenNotificationAction implements Action {
  readonly type = SEEN_NOTIFICATION;
  constructor(public id: number){}
}

export class FetchNotificationError implements Action {
  readonly type = FETCH_NOTIFICATION_ERROR;
  constructor(public error: string){}
}

export type NotificationAction =
| GetNotificationsAction
| SeenNotificationAction
| FetchNotificationError
| GetNotificationsSuccessAction
