import { createSelector } from 'reselect';

import selectors from 'state/selectors';

export default function createPopupSelector() {
  function idSelector(state, props) {
    return props.id;
  }

  const unitSelector = createSelector(
    idSelector,
    selectors.unitsSelector,
    (id, units) => units[id]
  );

  return createSelector(
    unitSelector,
    unit => ({
      name: unit.name,
      owner: unit.owner,
      streetAddress: unit.streetAddress,
      addressZip: unit.addressZip,
      city: unit.city,
      url: unit.url,
    })
  );
}
