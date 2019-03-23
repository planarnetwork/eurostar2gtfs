
export function stopId(stopName: string): string {
  return stopName.toLowerCase().replace(" ", "_");
}
