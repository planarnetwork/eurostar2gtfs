import { promisify } from "util";
import { readFile, writeFile } from "fs";
import { processTimetable } from "./eurostar/timetable";
import { createServiceIdRepository } from "./gtfs/repository/service";
import { createTripIdRepository } from "./gtfs/repository/trip";
import { createZip } from "./zip/create";

const read = promisify(readFile);

async function main() {
  const getServiceId = createServiceIdRepository();
  const getTripId = createTripIdRepository();
  const filename = process.argv[2] || "timetable.txt";
  const contents = await read(filename, "utf8");
  const gtfsFilename = process.argv[3] || "gtfs.zip";
  const gtfs = contents
    .split("# ")
    .slice(1)
    .flatMap(timetable => processTimetable(getServiceId, getTripId, timetable));

  createZip(gtfs).writeZip(gtfsFilename);
}

main().catch(e => console.error(e));
