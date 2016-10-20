import { createAction } from 'redux-actions';

import types from './actionTypes';

const changeCityFilter = createAction(types.CHANGE_CITY_FILTER);
const changeMessage = createAction(types.CHANGE_MESSAGE);

export default {
  changeCityFilter,
  changeMessage,
};
