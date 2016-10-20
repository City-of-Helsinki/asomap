import unique from 'lodash/sortedUniq';
import values from 'lodash/values';
import { createSelector, createStructuredSelector } from 'reselect';

function unitsSelector(state) {
  return state.data.units;
}

function selectedSelctor(state) {
  return state.filters.city;
}

const citiesSelector = createSelector(
  unitsSelector,
  units => unique(values(units).map(unit => unit.city).sort())
);

export default createStructuredSelector({
  cities: citiesSelector,
  selected: selectedSelctor,
});
