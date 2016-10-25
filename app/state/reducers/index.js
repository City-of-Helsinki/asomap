import { combineReducers } from 'redux';

import data from './dataReducer';
import filters from './filtersReducer';
import ui from './uiReducer';

export default combineReducers({
  data,
  filters,
  ui,
});
