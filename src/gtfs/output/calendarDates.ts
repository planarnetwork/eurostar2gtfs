import { PartialGtfs } from "../gtfs";
import { gdate } from "../../date/gdate";

export function outputCalendarDates(gtfs: PartialGtfs[]): string {
  const header = "service_id,date,exception_type\n";
  const processedServices = {};

  const getDates = (g: PartialGtfs) => {
    processedServices[g.calendar.serviceId] = true;

    return g.calendarDates.map(d => [d.serviceId, gdate(d.date), 1].join(","));
  };

  return header + gtfs
    .flatMap(getDates)
    .filter(row => row !== "")
    .join("\n");
}

