import { d } from "../../eurostar/date.spec";
import { createServiceIdRepository } from "../../../src/gtfs/repository/service";
import { createTripIdRepository } from "../../../src/gtfs/repository/trip";
import { getGtfs } from "../../../src/gtfs/gtfs";
import { j, monFri, st } from "../../eurostar/journey.spec";
import * as chai from "chai";
import { outputRoutes } from "../../../src/gtfs/output/routes";

describe("outputRoutes", () => {
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

  it("gets routes from a partial GTFS", () => {
    const actual = outputRoutes(gtfs);
    const expected = "route_id,agency_id,route_short_name,route_long_name,route_type,route_text_color,route_color,route_url,route_desc\n"
      + "london_paris,eurostar,london_paris,LONDON St Pancras Intl - PARIS Gare du Nord,1,,,,,LONDON St Pancras Intl - PARIS Gare du Nord";

    chai.expect(actual).to.equal(expected);
  });

});
