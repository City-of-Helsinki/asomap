import sortedUniq from 'lodash/sortedUniq';
import values from 'lodash/values';
import { createSelector, createStructuredSelector } from 'reselect';

function unitsSelector(state) {
  return state.data.units;
}

function filterSelector(state) {
  return state.filters.postalCodes;
}

const postalCodesSelector = createSelector(
  unitsSelector,
  units => sortedUniq(values(units).map(unit => unit.addressZip).sort())
);

export default createStructuredSelector({
  postalCodes: postalCodesSelector,
  selectedPostalCodes: filterSelector,
});
