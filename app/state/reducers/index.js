import { combineReducers } from 'redux';

import data from './dataReducer';
import example from './exampleReducer';

export default combineReducers({
  data,
  example,
});
