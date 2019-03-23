import { PartialGtfs } from "../gtfs";
import { StopTime } from "../trip";
import { stopId } from "../stop";

export function outputStopTimes(gtfs: PartialGtfs[]): string {
  const header = "trip_id,arrival_time,departure_time,stop_id,stop_sequence,stop_headsign,pickup_type,drop_off_type,shape_dist_traveled,timepoint\n";

  return header + gtfs
    .flatMap(g => g.stopTimes)
    .map(getStopTime)
    .join("\n");
}

function getStopTime(stopTime: StopTime, stopNumber: number, stops: StopTime[]): string {
  return [
    stopTime.tripId,
    stopTime.time + ":00",
    stopTime.time + ":00",
    stopId(stopTime.stop),
    stopNumber,
    null,
    stopNumber === stops.length - 1 ? 1 : 0,
    stopNumber === 0 ? 1 : 0,
    null,
    1
  ].join(",");
}
