import { d } from "../../eurostar/date.spec";
import { createServiceIdRepository } from "../../../src/gtfs/repository/service";
import { createTripIdRepository } from "../../../src/gtfs/repository/trip";
import { getGtfs } from "../../../src/gtfs/gtfs";
import { j, monFri, st } from "../../eurostar/journey.spec";
import * as chai from "chai";
import { outputTrips } from "../../../src/gtfs/output/trips";

describe("outputTrips", () => {
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

  it("gets trips from a partial GTFS", () => {
    const actual = outputTrips(gtfs);
    const expected = "route_id,service_id,trip_id,trip_headsign,trip_short_name,direction_id,wheelchair_accessible,bikes_allowed\n"
      + "london_paris,1,1,1,1,0,0,0\n"
      + "london_paris,2,2,2,2,0,0,0";

    chai.expect(actual).to.equal(expected);
  });

});
