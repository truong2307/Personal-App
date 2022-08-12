import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuizzTopicState } from "./quizz-topic.state";

const featureQuizzTopic = createFeatureSelector<QuizzTopicState>('quizzTopic_feature');
export const quizzTopicSelector = createSelector(featureQuizzTopic, state => state);
