import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NotificationEffects } from "./notification.effect";
import { notificationReducer } from "./notification.reducer";

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('notification_feature', notificationReducer),
    EffectsModule.forFeature([NotificationEffects]),
  ]
})
export class NotificationsModule { }
