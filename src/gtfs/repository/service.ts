import { CalendarDays, ServiceId } from "../calendar";
import { TimetableDate } from "../../eurostar/date";

/**
 * Maintain a repository of service IDs for unique calendars
 */
export function createServiceIdRepository(currentId: number = 1): ServiceIdRepository {
  const repository = {};

  return (timetableDates: TimetableDate, days: CalendarDays) => {
    const hash = hashCalendar(timetableDates, days);

    return repository[hash] || (repository[hash] = currentId++);
  };
}

export type ServiceIdRepository = (timetableDates: TimetableDate, days: CalendarDays) => ServiceId;

function hashCalendar(timetableDates: TimetableDate, days: CalendarDays): string {
  return [
    timetableDates.start.toEpochDay(),
    timetableDates.end.toEpochDay(),
    ...days,
    ...timetableDates.excluding.map(d => d.toEpochDay())
  ].join("_");
}
