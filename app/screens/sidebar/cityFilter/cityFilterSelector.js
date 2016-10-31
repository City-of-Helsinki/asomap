import sortedUniq from 'lodash/sortedUniq';
import { createSelector, createStructuredSelector } from 'reselect';

import selectors from 'state/selectors';

const citiesSelector = createSelector(
  selectors.unitsListSelector,
  units => sortedUniq(units.map(unit => unit.city).sort())
);

export default createStructuredSelector({
  cities: citiesSelector,
  selected: selectors.cityFilterSelector,
});
