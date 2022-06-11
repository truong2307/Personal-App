import { EventCalendar } from "src/shared/model/Event.interface";

export interface EventState {
  idEvent: number;
  item: EventCalendar;
  items: EventCalendar[];
  error?: string;
}
