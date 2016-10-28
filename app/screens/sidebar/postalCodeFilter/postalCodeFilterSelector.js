import sortedUniq from 'lodash/sortedUniq';
import values from 'lodash/values';
import { createSelector, createStructuredSelector } from 'reselect';

function unitsSelector(state) {
  return state.data.units;
}

function filterSelector(state) {
  return state.filters.postalCodes;
}

function cityFilterSelector(state) {
  return state.filters.city;
}

const cityUnitsSelector = createSelector(
  cityFilterSelector,
  unitsSelector,
  (city, units) => (
    city === '' ?
      values(units) :
      values(units).filter(unit => unit.city === city)
  )
);

const postalCodesSelector = createSelector(
  cityUnitsSelector,
  units => sortedUniq(units.map(unit => unit.addressZip).sort())
);

const filteredFilterSelector = createSelector(
  filterSelector,
  postalCodesSelector,
  (filter, postalCodes) => filter.filter(value => postalCodes.indexOf(value) !== -1)
);

export default createStructuredSelector({
  postalCodes: postalCodesSelector,
  selectedPostalCodes: filteredFilterSelector,
});
