import { createAction } from 'redux-actions';

import types from './actionTypes';

const changeMessage = createAction(types.CHANGE_MESSAGE);

export default {
  changeMessage,
};
