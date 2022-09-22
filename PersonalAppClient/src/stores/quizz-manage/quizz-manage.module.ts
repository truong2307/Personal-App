import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { QuizzManageEffects } from './quizz-manage.effect';
import { quizzManageReducer } from './quizz-manage.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('quizzManage_feature', quizzManageReducer),
  EffectsModule.forFeature([QuizzManageEffects]),
],
  declarations: [],
})
export class QuizzManageModule { }
