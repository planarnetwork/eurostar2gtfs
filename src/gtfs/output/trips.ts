import { PartialGtfs } from "../gtfs";
import { routeId } from "../route";

export function outputTrips(gtfs: PartialGtfs[]): string {
  const header = "route_id,service_id,trip_id,trip_headsign,trip_short_name,direction_id,wheelchair_accessible,bikes_allowed\n";

  return header + gtfs
    .map(getTrip)
    .join("\n");
}

function getTrip(gtfs: PartialGtfs): string {
  const origin = gtfs.stopTimes[0].stop;
  const destination = gtfs.stopTimes[gtfs.stopTimes.length - 1].stop;

  return [
    routeId(origin, destination),
    gtfs.trip.serviceId,
    gtfs.trip.tripId,
    gtfs.trip.tripId,
    gtfs.trip.tripId,
    0,
    0,
    0
  ].join(",");
}
