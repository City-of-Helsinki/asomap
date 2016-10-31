import actionTypes from 'actions/actionTypes';

const initialState = {
  units: {},
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_UNITS_SUCCESS:
      return Object.assign({}, state, { units: action.payload });
    default:
      return state;
  }
}
