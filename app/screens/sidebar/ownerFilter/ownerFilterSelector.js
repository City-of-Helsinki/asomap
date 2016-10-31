import sortedUniq from 'lodash/sortedUniq';
import { createSelector, createStructuredSelector } from 'reselect';

import selectors from 'state/selectors';

const ownersSelector = createSelector(
  selectors.unitsListSelector,
  units => sortedUniq(units.map(unit => unit.owner).sort())
);

export default createStructuredSelector({
  owners: ownersSelector,
  selectedOwners: selectors.ownerFilterSelector,
});
