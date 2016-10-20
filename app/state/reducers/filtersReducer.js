import actionTypes from 'actions/actionTypes';

const initialState = {
  city: '',
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CITY_FILTER:
      return Object.assign({}, state, { city: action.payload });
    default:
      return state;
  }
}
