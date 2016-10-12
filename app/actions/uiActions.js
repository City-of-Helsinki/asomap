import { createAction } from 'redux-actions';

import types from './ActionTypes';

const changeMessage = createAction(types.CHANGE_MESSAGE);

export default {
  changeMessage,
};
