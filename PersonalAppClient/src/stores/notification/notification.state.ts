import { NotificationModel } from "src/shared/model/Notification.interface";

export interface NotificationState {
  items : NotificationModel[];
  error? : string
}
