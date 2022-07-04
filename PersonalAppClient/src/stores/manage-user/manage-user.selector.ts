import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ManageUserState } from "./manage-user.state";

const featureManageUser = createFeatureSelector<ManageUserState>('managerUser_feature');
export const manageUserSelector = createSelector(featureManageUser, state => state);
