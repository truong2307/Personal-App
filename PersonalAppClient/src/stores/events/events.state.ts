import { EventCalendar } from "src/shared/model/event";

export interface EventState {
  idEvent: number;
  item: EventCalendar;
  items: EventCalendar[];
  error?: string;
}
