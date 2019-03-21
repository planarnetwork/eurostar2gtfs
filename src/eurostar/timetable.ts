import { getTimetableDates } from "./date";
import { getJourneys } from "./journey";
import { getGtfs, PartialGtfs } from "../gtfs/gtfs";
import { ServiceIdRepository } from "../gtfs/repository/service";
import { TripIdRepository } from "../gtfs/repository/trip";
import { sdate } from "../date/sdate";

export function processTimetable(
  getServiceId: ServiceIdRepository,
  getTripId: TripIdRepository,
  timetable: string
): PartialGtfs[] {

  const [dates, calendar, ...timetables] = timetable.split("\n\n");
  const [startDate, endDate] =  dates.split(" - ").map(sdate);
  const timetableDates = getTimetableDates(startDate, endDate, calendar);

  return timetables
    .flatMap(getJourneys)
    .flatMap(journey => getGtfs(getServiceId, getTripId, journey, timetableDates[journey.timetableId]));
}
