import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuizzManageState } from "./quizz-manage.state";

const featureQuizzManage = createFeatureSelector<QuizzManageState>('quizzManage_feature');
export const quizzManageSelector = createSelector(featureQuizzManage, state => state);
