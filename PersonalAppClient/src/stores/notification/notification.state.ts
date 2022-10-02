import { NotificationModel } from "src/shared/model/notification";

export interface NotificationState {
  items : NotificationModel[];
  error? : string
}
