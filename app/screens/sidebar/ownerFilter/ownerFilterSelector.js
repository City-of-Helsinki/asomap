import sortedUniq from 'lodash/sortedUniq';
import { createSelector, createStructuredSelector } from 'reselect';

import { countFilteredUnits } from 'screens/utils';
import selectors from 'state/selectors';

const ownerNamesSelector = createSelector(
  selectors.unitsListSelector,
  units => sortedUniq(units.map(unit => unit.owner).sort())
);

const ownersSelector = createSelector(
  ownerNamesSelector,
  selectors.unitsListSelector,
  selectors.cityFilterSelector,
  selectors.postalCodeFilterSelector,
  (ownerNames, units, city, postalCodes) => ownerNames.map(ownerName => ({
    name: ownerName,
    unitCount: countFilteredUnits(units, city, [ownerName], postalCodes),
  }))
);

export default createStructuredSelector({
  owners: ownersSelector,
  selectedOwners: selectors.ownerFilterSelector,
});
