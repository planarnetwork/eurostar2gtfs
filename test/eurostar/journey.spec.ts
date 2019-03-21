import * as chai from "chai";
import { getJourneys, CallingPoint, Journey } from "../../src/eurostar/journey";
import { CalendarDays } from "../../src/gtfs/calendar";

export const monFri: CalendarDays = [1, 1, 1, 1, 1, 0, 0];
export const sat: CalendarDays = [0, 0, 0, 0, 0, 1, 0];

describe("getJourneys", () => {

  it("get journeys", () => {
    const expected = [
      j(
        "9080",
        0,
        monFri,
        st("LONDON St Pancras Intl", "05:40"),
        st("EBBSFLEET International", "05:58"),
        st("ASHFORD International", "06:24"),
        st("PARIS Gare du Nord", "09:17"),
      ),
      j(
        "9002",
        0,
        sat,
        st("LONDON St Pancras Intl", "06:18"),
        st("ASHFORD International", "06:55"),
        st("PARIS Gare du Nord", "09:47"),
      )
    ];

    const actual = getJourneys(
      "LONDON St Pancras Intl\n" +
      "EBBSFLEET International\n" +
      "ASHFORD International\n" +
      "PARIS Gare du Nord\n" +
      "Train no.\n" +
      "P P P P P - - 05:40 05:58 06:24 09:17 9080\n" +
      "- - - - - P - 06:18 - 06:55 09:47 9002\n"
    );

    chai.expect(actual).to.deep.equal(expected);
  });

  it("get journeys with specific calendars", () => {
    const expected = [
      j(
        "9080",
        1,
        monFri,
        st("LONDON St Pancras Intl", "05:40"),
        st("EBBSFLEET International", "05:58"),
        st("ASHFORD International", "06:24"),
        st("PARIS Gare du Nord", "09:17"),
      ),
      j(
        "9002",
        2,
        sat,
        st("LONDON St Pancras Intl", "06:18"),
        st("ASHFORD International", "06:55"),
        st("PARIS Gare du Nord", "09:47"),
      )
    ];

    const actual = getJourneys(
      "LONDON St Pancras Intl\n" +
      "EBBSFLEET International\n" +
      "ASHFORD International\n" +
      "PARIS Gare du Nord\n" +
      "Train no.\n" +
      "1 P P P P P - - 05:40 05:58 06:24 09:17 9080\n" +
      "2 - - - - - P - 06:18 - 06:55 09:47 9002\n"
    );

    chai.expect(actual).to.deep.equal(expected);
  });
});

export function j(tripId: string, calendarId: number, days: CalendarDays, ...stopTimes: CallingPoint[]): Journey {
  return {
    journeyId: tripId,
    timetableId: calendarId,
    days,
    callingPoints: stopTimes
  };
}

export function st(stop: string, time: string) {
  return { stop, time };
}
