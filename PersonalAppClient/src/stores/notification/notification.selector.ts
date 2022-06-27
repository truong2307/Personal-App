import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotificationState } from "./notification.state";

const featureNotification = createFeatureSelector<NotificationState>('notification_feature');
export const notificationSelector = createSelector(featureNotification, state => state);
