import { d } from "../../eurostar/date.spec";
import { createServiceIdRepository } from "../../../src/gtfs/repository/service";
import { createTripIdRepository } from "../../../src/gtfs/repository/trip";
import { getGtfs } from "../../../src/gtfs/gtfs";
import { j, monFri, st } from "../../eurostar/journey.spec";
import * as chai from "chai";
import { outputTransfers } from "../../../src/gtfs/output/transfers";

describe("outputTransfers", () => {
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

  it("gets transfers from a partial GTFS", () => {
    const actual = outputTransfers(gtfs);
    const expected = "from_stop_id,to_stop_id,transfer_type,min_transfer_time\n"
      + "london,london,2,3600\n"
      + "ebbsfleet,ebbsfleet,2,3600\n"
      + "ashford,ashford,2,3600\n"
      + "paris,paris,2,3600";

    chai.expect(actual).to.equal(expected);
  });

});
