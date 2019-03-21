import { ServiceId } from "./calendar";

export interface Trip {
  tripId: TripId,
  serviceId: ServiceId,
  headsign: string
}

export interface StopTime {
  tripId: TripId,
  stop: string,
  time: string
}

export type TripId = number;
