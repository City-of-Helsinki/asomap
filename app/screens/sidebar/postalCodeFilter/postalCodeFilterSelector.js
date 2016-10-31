import { createStructuredSelector } from 'reselect';

import selectors from 'state/selectors';

export default createStructuredSelector({
  postalCodes: selectors.cityUnitPostalCodesSelector,
  selectedPostalCodes: selectors.postalCodeFilterSelector,
});
