export function eur(cents: number) {
  const v = (cents / 100).toFixed(2).replace(".", ",");
  return `${v} €`;
}
