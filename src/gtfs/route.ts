import { stopId } from "./stop";

export function routeId(origin: string, destination: string): string {
  return stopId(origin) + "_" + stopId(destination);
}
