import { CalendarDays } from "../gtfs/calendar";

/**
 * Extract journeys from:
 *
 * LONDON St Pancras Intl
 * EBBSFLEET International
 * ASHFORD International
 * PARIS Gare du Nord
 * Train no.
 * P P P P P - - 05:40 05:58 06:24 09:17 9080
 * - - - - - P - 06:18 - 06:55 09:47 9002
 */
export function getJourneys(trips: string): Journey[] {
  const lines = trips.split("\n");
  const stopsEnd = lines.findIndex(l => l === "Train no.");
  const stops = lines.slice(0, stopsEnd);

  return lines
    .slice(stopsEnd + 1)
    .filter(l => l.length > 0)
    .map(l => firstCharIsNumber(l) ? "0 " + l : l)
    .map(l => createJourney(l, stops));
}

function firstCharIsNumber(line: string): boolean {
  return isNaN(parseInt(line.charAt(0), 10));
}

function createJourney(line: string, stops: string[]): Journey {
  const [timetableDateId, mo, tu, we, th, fr, sa, su, ...times] = line.split(" ");
  const journeyId = times.pop() as string;

  return {
    journeyId: journeyId,
    timetableId: parseInt(timetableDateId, 10),
    days: [mo, tu, we, th, fr, sa, su].map(d => d === "P" ? 1 : 0),
    callingPoints: times.map((time, index) => ({
      time: time,
      stop: stops[index]
    })).filter(s => s.time !== "-")
  };
}

export interface Journey {
  journeyId: string,
  timetableId: number,
  days: CalendarDays,
  callingPoints: CallingPoint[]
}

export interface CallingPoint {
  stop: string,
  time: string
}
