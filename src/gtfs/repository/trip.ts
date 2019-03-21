import { TripId } from "../trip";

/**
 * Generate trip IDs
 */
export function createTripIdRepository(currentId: number = 1): TripIdRepository {
  return () => currentId++;
}

export type TripIdRepository = () => TripId;

