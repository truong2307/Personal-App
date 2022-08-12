import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ManageUserEffects } from './quizz-topic.effect';
import { quizzTopicReducer } from './quizz-topic.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('quizzTopic_feature', quizzTopicReducer),
    EffectsModule.forFeature([ManageUserEffects]),
  ]
})
export class QuizzTopicModule { }
