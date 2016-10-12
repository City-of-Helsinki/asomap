import actionTypes from 'actions/ActionTypes';

const initialState = {
  message: 'Message from reducer!!!',
};

function exampleReducer(state = initialState, action) {
  switch (action.type) {

    case actionTypes.CHANGE_MESSAGE: {
      return Object.assign({}, state, { message: 'Another message' });
    }

    default: {
      return state;
    }
  }
}

export default exampleReducer;
