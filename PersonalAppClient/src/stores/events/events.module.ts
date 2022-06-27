import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EventEffects } from './events.effects';
import { eventReducer } from './events.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('event_feature', eventReducer),
    EffectsModule.forFeature([EventEffects]),
  ]
})
export class EventsModule { }
