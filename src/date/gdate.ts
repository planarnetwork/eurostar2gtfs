import { DateTimeFormatter, LocalDate } from "js-joda";

const f = DateTimeFormatter.ofPattern("yyyyMMdd");

export function gdate(date: LocalDate): string {
  return date.format(f);
}
