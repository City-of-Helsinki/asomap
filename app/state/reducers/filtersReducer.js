import actionTypes from 'actions/actionTypes';

const initialState = {
  city: '',
  postalCodes: [],
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CITY_FILTER:
      return Object.assign({}, state, { city: action.payload });
    case actionTypes.CHANGE_POSTAL_CODE_FILTER:
      return Object.assign({}, state, { postalCodes: action.payload });
    default:
      return state;
  }
}
