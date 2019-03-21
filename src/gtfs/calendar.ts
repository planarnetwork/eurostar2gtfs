import { LocalDate } from "js-joda";

export interface Calendar {
  serviceId: ServiceId,
  start: LocalDate,
  end: LocalDate,
  days: CalendarDays
}

export type CalendarDays = IntBool[];

export type IntBool = 0 | 1;

export interface CalendarDate {
  serviceId: ServiceId,
  date: LocalDate
}

export type ServiceId = number;
