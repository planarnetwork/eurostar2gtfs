import { PartialGtfs } from "../gtfs/gtfs";
import * as AdmZip from "adm-zip";
import { outputAgency } from "../gtfs/output/agency";
import { outputCalendar } from "../gtfs/output/calendar";
import { outputCalendarDates } from "../gtfs/output/calendarDates";
import { outputRoutes } from "../gtfs/output/routes";
import { outputStops } from "../gtfs/output/stops";
import { outputStopTimes } from "../gtfs/output/stopTimes";
import { outputTransfers } from "../gtfs/output/transfers";
import { outputTrips } from "../gtfs/output/trips";

const files = {
  "agency.txt": outputAgency,
  "calendar.txt": outputCalendar,
  "calendar_dates.txt": outputCalendarDates,
  "routes.txt": outputRoutes,
  "stops.txt": outputStops,
  "stop_times.txt": outputStopTimes,
  "transfers.txt": outputTransfers,
  "trips.txt": outputTrips
};

/**
 * Create zip archive with contents of GTFS files
 */
export function createZip(gtfs: PartialGtfs[]): AdmZip {
  const zip = new AdmZip();

  for (const file in files) {
    const contents = files[file](gtfs);

    zip.addFile(file, Buffer.alloc(contents.length, contents));

  }

  return zip;
}
