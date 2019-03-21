import { DateTimeFormatter, LocalDate } from "js-joda";
import { Locale } from "@js-joda/locale_en";

const formatter = DateTimeFormatter
  .ofPattern("d MMMM yyyy")
  .withLocale(Locale.ENGLISH);

/**
 * Convert "4 March 2019" to a LocalDate
 */
export function date(input: string) {
  return LocalDate.parse(input, formatter);
}
