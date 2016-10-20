import { combineReducers } from 'redux';

import data from './dataReducer';
import example from './exampleReducer';
import filters from './filtersReducer';

export default combineReducers({
  data,
  example,
  filters,
});
