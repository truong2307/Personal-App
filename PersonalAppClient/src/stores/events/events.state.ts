import { EventCalendar } from "src/shared/model/event.interface";

export interface EventState {
  idEvent: number;
  item: EventCalendar;
  items: EventCalendar[];
  error?: string;
}
