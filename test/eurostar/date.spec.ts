import { TimetableDate, getTimetableDates } from "../../src/eurostar/date";
import { LocalDate } from "js-joda";
import { date } from "../../src/date/date";
import * as chai from "chai";

describe("getTimetableDates", () => {
  const startDate = LocalDate.MIN;
  const endDate = LocalDate.MAX;

  it("parses a single calendar", () => {
    const input = "1 Runs from 31 March 2019";
    const expected = [
      [
        d("31 March 2019", endDate)
      ]
    ];
    const actual = getTimetableDates(startDate, endDate, input);

    chai.expect(actual.slice(1)).to.deep.equal(expected);
  });

  it("parses a multiple calendars", () => {
    const input = "1 Runs from 31 March 2019\n" +
                  "2 Runs between 6 April 2019 and 20 April 2019";
    const expected = [
      [
        d("31 March 2019", endDate)
      ],
      [
        d("6 April 2019", "20 April 2019")
      ]
    ];
    const actual = getTimetableDates(startDate, endDate, input);

    chai.expect(actual.slice(1)).to.deep.equal(expected);
  });

  it("parses a multiple calendars on a single line", () => {
    const input = "1 Runs from 31 March 2019. Runs between 6 April 2019 and 20 April 2019";
    const expected = [
      [
        d("31 March 2019", endDate),
        d("6 April 2019", "20 April 2019")
      ]
    ];
    const actual = getTimetableDates(startDate, endDate, input);

    chai.expect(actual.slice(1)).to.deep.equal(expected);
  });

  it("parses exclude dates", () => {
    const input = "3 Runs between 6 January 2019 and 2 February 2019, not running on 20 January 2019, not running on 21 January 2019";
    const expected = [
      [
        d("6 January 2019", "2 February 2019", ["20 January 2019", "21 January 2019"])
      ]
    ];
    const actual = getTimetableDates(startDate, endDate, input);

    chai.expect(actual.slice(1)).to.deep.equal(expected);
  });

});

export function d(start: string | LocalDate, end: string | LocalDate, excluding: string[] = []): TimetableDate {
  return {
    start: typeof start === "string" ? date(start) : start,
    end: typeof end === "string" ? date(end) : end,
    excluding: excluding.map(e => date(e))
  };
}
