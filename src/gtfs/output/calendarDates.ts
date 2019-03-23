import { PartialGtfs } from "../gtfs";
import { CalendarDate } from "../calendar";
import { gdate } from "../../date/gdate";

export function outputCalendarDates(gtfs: PartialGtfs[]): string {
  const header = "service_id,date,exception_type\n";
  const processedServices = {};

  const getDates = (dates: CalendarDate[]) => {
    processedServices[dates[0].serviceId] = true;

    return dates.map(d => [d.serviceId, gdate(d.date), 1].join(","));
  };

  return header + gtfs
  .flatMap(g => processedServices[g.calendar.serviceId] ? "" : getDates(g.calendarDates))
  .join("\n");
}

