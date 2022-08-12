import { NotificationModel } from "src/shared/model/notification.interface";

export interface NotificationState {
  items : NotificationModel[];
  error? : string
}
