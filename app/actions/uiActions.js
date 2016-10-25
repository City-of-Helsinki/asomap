import { createAction } from 'redux-actions';

import types from './actionTypes';

const changeCityFilter = createAction(types.CHANGE_CITY_FILTER);
const changeOwnerFilter = createAction(types.CHANGE_OWNER_FILTER);
const changePostalCodeFilter = createAction(types.CHANGE_POSTAL_CODE_FILTER);

export default {
  changeCityFilter,
  changeOwnerFilter,
  changePostalCodeFilter,
};
