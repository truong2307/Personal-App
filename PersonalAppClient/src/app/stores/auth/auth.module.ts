import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { authReducer } from './auth.reducer';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('auth_feature', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthModule { }
