export function hasTakeawayOnly(items: any[]) {
  return items.some(
    (item) => item.customizations?.exclusive?.takeawayOnly === true
  );
}
