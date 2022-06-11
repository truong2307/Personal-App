import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventState } from "./events.state";

const featureEvent = createFeatureSelector<EventState>('event_feature');
export const eventSelector = createSelector(featureEvent, state => state);
