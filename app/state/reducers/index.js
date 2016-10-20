import { combineReducers } from 'redux';

import data from './dataReducer';
import filters from './filtersReducer';

export default combineReducers({
  data,
  filters,
});
