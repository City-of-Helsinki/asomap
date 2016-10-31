import sortedUniq from 'lodash/sortedUniq';
import values from 'lodash/values';
import { createSelector } from 'reselect';

function unitsSelector(state) {
  return state.data.units;
}

function cityFilterSelector(state) {
  return state.filters.city;
}

function ownerFilterSelector(state) {
  return state.filters.owners;
}

function postalCodeFilterSelector(state) {
  return state.filters.postalCodes;
}

const unitsListSelector = createSelector(
  unitsSelector,
  units => values(units)
);

const isLoadedSelector = createSelector(
  unitsListSelector,
  units => Boolean(units.length)
);

const cityUnitsSelector = createSelector(
  cityFilterSelector,
  unitsListSelector,
  (city, units) => (city === '' ? units : units.filter(unit => unit.city === city))
);

const cityUnitPostalCodesSelector = createSelector(
  cityUnitsSelector,
  units => sortedUniq(units.map(unit => unit.addressZip).sort())
);

const filteredPostalCodeFilterSelector = createSelector(
  postalCodeFilterSelector,
  cityUnitPostalCodesSelector,
  (selectedPostalCodes, validPostalCodes) =>
    selectedPostalCodes.filter(code => validPostalCodes.indexOf(code) !== -1)
);

export default {
  cityFilterSelector,
  cityUnitPostalCodesSelector,
  cityUnitsSelector,
  filteredPostalCodeFilterSelector,
  isLoadedSelector,
  ownerFilterSelector,
  postalCodeFilterSelector,
  unitsListSelector,
  unitsSelector,
};
