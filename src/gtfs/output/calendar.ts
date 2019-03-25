import { PartialGtfs } from "../gtfs";
import { Calendar } from "../calendar";
import { gdate } from "../../date/gdate";

export function outputCalendar(gtfs: PartialGtfs[]): string {
  const header = "service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday,start_date,end_date\n";
  const processedServices = {};

  const getRow = (calendar: Calendar) => {
    processedServices[calendar.serviceId] = [
      calendar.serviceId,
      ...calendar.days,
      gdate(calendar.start),
      gdate(calendar.end)
    ].join(",");

    return processedServices[calendar.serviceId];
  };

  return header + gtfs
    .map(g => processedServices[g.calendar.serviceId] ? "" : getRow(g.calendar))
    .filter(row => row !== "")
    .join("\n");
}

