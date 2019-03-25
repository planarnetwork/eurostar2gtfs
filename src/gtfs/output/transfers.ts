import { PartialGtfs } from "../gtfs";
import { stopId } from "../stop";

export function outputTransfers(gtfs: PartialGtfs[]): string {
  const header = "from_stop_id,to_stop_id,transfer_type,min_transfer_time\n";
  const seenStops = {};

  const getTransfer = (stop: string) => {
    seenStops[stop] = true;

    return [
      stopId(stop),
      stopId(stop),
      2,
      3600
    ].join(",");
  };

  return header + gtfs
    .flatMap(g => g.stopTimes)
    .map(st => seenStops[st.stop] ? "" : getTransfer(st.stop))
    .filter(row => row !== "")
    .join("\n");
}
