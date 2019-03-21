import { Journey } from "../eurostar/journey";
import { ServiceIdRepository } from "./repository/service";
import { TimetableDate } from "../eurostar/date";
import { Calendar, CalendarDate } from "./calendar";
import { TripIdRepository } from "./repository/trip";
import { StopTime, Trip } from "./trip";

/**
 * Convert the journey and the timetable dates into some GTFS-like data
 */
export function getGtfs(
  getServiceId: ServiceIdRepository,
  getTripId: TripIdRepository,
  journey: Journey,
  timetableDates: TimetableDate[]
): PartialGtfs[] {

  const createPartialGtfs = (dates: TimetableDate): PartialGtfs => {
    const serviceId = getServiceId(dates, journey.days);
    const calendar = { serviceId: serviceId, start: dates.start, end: dates.end, days: journey.days };
    const calendarDates = dates.excluding.map(date => ({ serviceId, date }));

    const tripId = getTripId();
    const trip = { tripId, serviceId, headsign: journey.journeyId };
    const stopTimes = journey.callingPoints.map(s => Object.assign({ tripId: tripId }, s));

    return { calendar, calendarDates, trip, stopTimes };
  };

  return timetableDates.map(createPartialGtfs);
}

export interface PartialGtfs {
  "calendar": Calendar,
  "calendarDates": CalendarDate[],
  "trip": Trip,
  "stopTimes": StopTime[]
}

