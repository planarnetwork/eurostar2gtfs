import { LocalDate } from "js-joda";
import { date } from "../date/date";


/**
 * Turns:
 *
 * 1 Runs from 31 March 2019
 * 2 Runs between 6 April 2019 and 20 April 2019. Runs on 4 May 2019.
 * 3 Runs between 6 January 2019 and 2 February 2019, not running 20 January 2019, not running 21 January 2019
 * 4 Runs until 30 March 2019. Runs between 25 May 2019 and 1 June 2019.
 *
 * Into:
 *
 * [
 *  [
 *    { start: "31 March 2019", end: endDate }
 *  ],
 *  [
 *    { start: "6 April 2019", end: "20 April 2019" },
 *    { start: "4 May 2019", end: "4 May 2019" }
 *  ],
 *  [
 *    { start: "6 January 2019", end: "2 February 2019", excluding: ["20 January 2019", "21 January 2019"] }
 *  ],
 *  [
 *    { start: startDate, end: "30 March 2019"},
 *    { start: "25 May 2019", end: "1 June 2019" }
 *  ]
 * ]
 *
 */
export function getTimetableDates(startDate: LocalDate, endDate: LocalDate, calendar: string): TimetableDates {

  const lineProcessors = {
    "fro": line => [date(line), endDate],
    "unt": line => [startDate, date(line)],
    "on ": line => [date(line), date(line)],
    "bet": line => line.split(" and ").map(date)
  };

  const createDatesFromSentence = (line: string) => {
    const [dateString, ...excludes] = line.split(", ");
    const excluding = excludes.map(t => date(t.substr(15)));
    const calendarType = dateString.substr(5, 3);

    if (!lineProcessors[calendarType]) {
      throw "Unknown date: " + line;
    }

    const dateValue = dateString.substr(dateString.indexOf(" ", 5) + 1);
    const [start, end] = lineProcessors[calendarType](dateValue);

    return { start, end, excluding };
  };

  const createDatesFromLine = (line: string) => line
    .substr(line.indexOf(" ") + 1)
    .split(". ")
    .map(createDatesFromSentence);

  const calendarDates = calendar
    .split("\n")
    .map(createDatesFromLine);

  const baseDates: TimetableDates = [[{ start: startDate, end: endDate, excluding: [] }]];

  return baseDates.concat(calendarDates);
}


export type TimetableDates = TimetableDate[][];

export type TimetableDate = {
  start: LocalDate,
  end: LocalDate,
  excluding: LocalDate[]
};
