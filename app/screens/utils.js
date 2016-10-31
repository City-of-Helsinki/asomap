export function unitMatchesFilters(unit, city, owners, postalCodes) {
  return (
    (city === '' || unit.city === city) &&
    (owners.length === 0 || owners.indexOf(unit.owner) !== -1) &&
    (postalCodes.length === 0 || postalCodes.indexOf(unit.addressZip) !== -1)
  );
}

export function countFilteredUnits(units, city, owners, postalCodes) {
  return units.reduce(
    (value, unit) => value + Number(unitMatchesFilters(unit, city, owners, postalCodes)),
    0
  );
}
