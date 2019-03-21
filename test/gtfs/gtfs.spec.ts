import { d } from "../eurostar/date.spec";
import { createServiceIdRepository } from "../../src/gtfs/repository/service";
import { createTripIdRepository } from "../../src/gtfs/repository/trip";
import { getGtfs } from "../../src/gtfs/gtfs";
import { j, monFri, st } from "../eurostar/journey.spec";
import * as chai from "chai";
import { date } from "../../src/date/date";

describe("getGtfs", () => {
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

  it("returns a PartialGtfs for every timetable date", () => {
    const actual = getGtfs(getServiceId, getTripId, journey, timetableDates);
    const expected = [{
      "calendar": {
        "serviceId": 1,
        "start": date("6 April 2019"),
        "end": date("20 April 2019"),
        "days": [1, 1, 1, 1, 1, 0, 0]
      },
      "calendarDates": [],
      "trip": { "tripId": 1, "serviceId": 1, "headsign": "9080" },
      "stopTimes": [{ "tripId": 1, "stop": "LONDON St Pancras Intl", "time": "05:40" }, {
        "tripId": 1,
        "stop": "EBBSFLEET International",
        "time": "05:58"
      }, { "tripId": 1, "stop": "ASHFORD International", "time": "06:24" }, {
        "tripId": 1,
        "stop": "PARIS Gare du Nord",
        "time": "09:17"
      }]
    }, {
      "calendar": {
        "serviceId": 2,
        "start": date("6 January 2019"),
        "end": date("2 February 2019"),
        "days": [1, 1, 1, 1, 1, 0, 0]
      },
      "calendarDates": [{ "serviceId": 2, "date": date("20 January 2019") }, { "serviceId": 2, "date": date("21 January 2019") }],
      "trip": { "tripId": 2, "serviceId": 2, "headsign": "9080" },
      "stopTimes": [{ "tripId": 2, "stop": "LONDON St Pancras Intl", "time": "05:40" }, {
        "tripId": 2,
        "stop": "EBBSFLEET International",
        "time": "05:58"
      }, { "tripId": 2, "stop": "ASHFORD International", "time": "06:24" }, {
        "tripId": 2,
        "stop": "PARIS Gare du Nord",
        "time": "09:17"
      }]
    }];

    chai.expect(actual).to.deep.equal(expected);
  });

});
