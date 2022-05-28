import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

const featureAuth = createFeatureSelector<AuthState>('auth_feature');
export const loginSelector = createSelector(featureAuth, state => state.item);
export const tokenSelector = createSelector(featureAuth, state => state.token);
export const errorSelector = createSelector(featureAuth, state => state.error);
