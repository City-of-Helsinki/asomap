import sortedUniq from 'lodash/sortedUniq';
import { createSelector, createStructuredSelector } from 'reselect';

import { countFilteredUnits } from 'screens/utils';
import selectors from 'state/selectors';

const cityNamesSelector = createSelector(
  selectors.unitsListSelector,
  units => sortedUniq(units.map(unit => unit.city).sort())
);

const citiesSelector = createSelector(
  cityNamesSelector,
  selectors.unitsListSelector,
  selectors.ownerFilterSelector,
  selectors.postalCodeFilterSelector,
  (cityNames, units, owners, postalCodes) => cityNames.map(cityName => ({
    name: cityName,
    unitCount: countFilteredUnits(units, cityName, owners, postalCodes),
  }))
);

export default createStructuredSelector({
  cities: citiesSelector,
  selected: selectors.cityFilterSelector,
});
