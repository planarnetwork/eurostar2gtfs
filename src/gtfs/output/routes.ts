import { PartialGtfs } from "../gtfs";
import { routeId } from "../route";
import { stopId } from "../stop";

export function outputRoutes(gtfs: PartialGtfs[]): string {
  const header = "route_id,agency_id,route_short_name,route_long_name,route_type,route_text_color,route_color,route_url,route_desc\n";
  const seenRoutes = {};

  const getRoute = ({ trip, stopTimes }: PartialGtfs) => {
    const first = stopTimes[0].stop;
    const last = stopTimes[stopTimes.length - 1].stop;
    const id = routeId(first, last);
    const line = seenRoutes[id] ? "" : [
      id,
      "eurostar",
      stopId(first) + "_" + stopId(last),
      first + " - " + last,
      1,
      null,
      null,
      null,
      null,
      first + " - " + last
    ].join(",");

    seenRoutes[id] = true;

    return line;
  };

  return header + gtfs
    .map(getRoute)
    .filter(row => row !== "")
    .join("\n");
}
