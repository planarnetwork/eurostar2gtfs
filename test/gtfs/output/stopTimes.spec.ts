import { d } from "../../eurostar/date.spec";
import { createServiceIdRepository } from "../../../src/gtfs/repository/service";
import { createTripIdRepository } from "../../../src/gtfs/repository/trip";
import { getGtfs } from "../../../src/gtfs/gtfs";
import { j, monFri, st } from "../../eurostar/journey.spec";
import * as chai from "chai";
import { outputStopTimes } from "../../../src/gtfs/output/stopTimes";

describe("outputStopTimes", () => {
  const timetableDates = [
    d("6 April 2019", "20 April 2019"),
    d("6 January 2019", "2 February 2019", ["20 January 2019", "21 January 2019"])
  ];

  const journey = j(
    "9080",
    0,
    monFri,
    st("LONDON St Pancras Intl", "05:40"),
    st("EBBSFLEET International", "05:58"),
    st("ASHFORD International", "06:24"),
    st("PARIS Gare du Nord", "09:17"),
  );

  const getServiceId = createServiceIdRepository();
  const getTripId = createTripIdRepository();
  const gtfs = getGtfs(getServiceId, getTripId, journey, timetableDates);

  it("gets stop times from a partial GTFS", () => {
    const actual = outputStopTimes(gtfs);
    const expected = "trip_id,arrival_time,departure_time,stop_id,stop_sequence,stop_headsign,pickup_type,drop_off_type,shape_dist_traveled,timepoint\n"
    + "1,05:40:00,05:40:00,london,0,,0,1,,1\n"
    + "1,05:58:00,05:58:00,ebbsfleet,1,,0,0,,1\n"
    + "1,06:24:00,06:24:00,ashford,2,,0,0,,1\n"
    + "1,09:17:00,09:17:00,paris,3,,0,0,,1\n"
    + "2,05:40:00,05:40:00,london,4,,0,0,,1\n"
    + "2,05:58:00,05:58:00,ebbsfleet,5,,0,0,,1\n"
    + "2,06:24:00,06:24:00,ashford,6,,0,0,,1\n"
    + "2,09:17:00,09:17:00,paris,7,,1,0,,1";

    chai.expect(actual).to.equal(expected);
  });

});
