import { PartialGtfs } from "../gtfs";
import { stopId } from "../stop";

export function outputStops(gtfs: PartialGtfs[]): string {
  const header = "stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station,stop_timezone,wheelchair_boarding\n";
  const seenStops = {};

  const getStop = (stop: string) => {
    seenStops[stop] = true;

    return [
      stopId(stop),
      stopId(stop),
      stop,
      stop,
      "0.00",
      "0.00",
      null,
      null,
      null,
      null,
      null,
      0
    ].join(",");
  };

  return header + gtfs
    .flatMap(g => g.stopTimes)
    .map(st => seenStops[st.stop] ? "" : getStop(st.stop))
    .filter(row => row !== "")
    .join("\n");
}
