import { createAction } from 'redux-actions';

import apiService from 'services/api';
import types from './actionTypes';

function getUnits() {
  return (dispatch) => {
    dispatch(getUnits.request());
    apiService.getUnits()
      .then(data => dispatch(getUnits.success(data)))
      .catch(error => dispatch(getUnits.error(error)));
  };
}
getUnits.error = createAction(types.GET_UNITS_ERROR);
getUnits.request = createAction(types.GET_UNITS_REQUEST);
getUnits.success = createAction(types.GET_UNITS_SUCCESS);

export default {
  getUnits,
};
