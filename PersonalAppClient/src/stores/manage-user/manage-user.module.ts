import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ManageUserEffects } from './manage-user.effects';
import { manageUserReducer } from './manage-user.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('managerUser_feature', manageUserReducer),
    EffectsModule.forFeature([ManageUserEffects]),
  ]
})
export class ManageUserModule { }
