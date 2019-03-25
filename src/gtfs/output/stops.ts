import { PartialGtfs } from "../gtfs";
import { stopId } from "../stop";

const coords = {
  "london": [51.5314, 0.1261],
  "ashford": [51.1465, 0.8750],
  "ebbsfleet": [51.4431, 0.3209],
  "paris": [48.8809, 2.3553],
  "brussels": [50.8368, 4.3349],
  "lille": [50.6391, 3.0757],
  "calais": [50.9015, 1.8112],
  "rotterdam": [51.9225, 4.47917],
  "amsterdam": [52.3791, 4.9003],
  "marne": [48.8593, 2.5985],
};

export function outputStops(gtfs: PartialGtfs[]): string {
  const header = "stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station,stop_timezone,wheelchair_boarding\n";
  const seenStops = {};

  const getStop = (stop: string) => {
    seenStops[stop] = true;
    const id = stopId(stop);

    return [
      id,
      id,
      stop,
      stop,
      coords[id] ? coords[id][0] : "0.00",
      coords[id] ? coords[id][1] : "0.00",
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
