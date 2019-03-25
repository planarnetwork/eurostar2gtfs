
export function stopId(stopName: string): string {
  return stopName.split(" ")[0].toLowerCase();
}
