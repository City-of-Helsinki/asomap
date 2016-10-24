import sortedUniq from 'lodash/sortedUniq';
import values from 'lodash/values';
import { createSelector, createStructuredSelector } from 'reselect';

function unitsSelector(state) {
  return state.data.units;
}

const ownersSelector = createSelector(
  unitsSelector,
  units => sortedUniq(values(units).map(unit => unit.owner).sort())
);

export default createStructuredSelector({
  owners: ownersSelector,
});
