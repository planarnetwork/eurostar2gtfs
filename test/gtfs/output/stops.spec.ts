import { d } from "../../eurostar/date.spec";
import { createServiceIdRepository } from "../../../src/gtfs/repository/service";
import { createTripIdRepository } from "../../../src/gtfs/repository/trip";
import { getGtfs } from "../../../src/gtfs/gtfs";
import { j, monFri, st } from "../../eurostar/journey.spec";
import * as chai from "chai";
import { outputStops } from "../../../src/gtfs/output/stops";

describe("outputStops", () => {
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

  it("gets stops from a partial GTFS", () => {
    const actual = outputStops(gtfs);
    const expected = "stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station,stop_timezone,wheelchair_boarding\n"
      + "london,london,LONDON St Pancras Intl,LONDON St Pancras Intl,51.53239,-0.12719,,,,,,0\n"
      + "ebbsfleet,ebbsfleet,EBBSFLEET International,EBBSFLEET International,51.4431,0.3209,,,,,,0\n"
      + "ashford,ashford,ASHFORD International,ASHFORD International,51.1465,0.875,,,,,,0\n"
      + "paris,paris,PARIS Gare du Nord,PARIS Gare du Nord,48.8809,2.3553,,,,,,0";

    chai.expect(actual).to.equal(expected);
  });

});
