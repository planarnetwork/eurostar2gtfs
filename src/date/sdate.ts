import { DateTimeFormatter, LocalDate } from "js-joda";
import { Locale } from "@js-joda/locale_en";

const formatter = DateTimeFormatter
  .ofPattern("dd MMM yyyy")
  .withLocale(Locale.ENGLISH);

/**
 * Convert "04 DEC 2019" to a LocalDate
 */
export function sdate(input: string): LocalDate {
  const [day, month, year] = input.split(" ");
  const mmm = month.charAt(0) + month.slice(1).toLowerCase();
  const dateString = [day, mmm, year].join(" ");

  return LocalDate.parse(dateString, formatter);
}
