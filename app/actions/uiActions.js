import { createAction } from 'redux-actions';

import types from './actionTypes';

const changeCityFilter = createAction(types.CHANGE_CITY_FILTER);

export default {
  changeCityFilter,
};
