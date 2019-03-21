import { promisify } from "util";
import { readFile } from "fs";
import { processTimetable } from "./eurostar/timetable";
import { createServiceIdRepository } from "./gtfs/repository/service";
import { createTripIdRepository } from "./gtfs/repository/trip";

const read = promisify(readFile);

async function main() {
  const getServiceId = createServiceIdRepository();
  const getTripId = createTripIdRepository();
  const filename = process.argv[2] || "timetable.txt";
  const contents = await read(filename, "utf8");
  const gtfs = contents
    .split("# ")
    .slice(1)
    .map(timetable => processTimetable(getServiceId, getTripId, timetable));
    // .reduce(flattenGTFS, {});

  gtfs.forEach(g => console.log(g));
}

main().catch(e => console.error(e));
