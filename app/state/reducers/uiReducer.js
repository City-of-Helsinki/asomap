import actionTypes from 'actions/actionTypes';

const initialState = {
  sidebar: {
    collapsed: true,
  },
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        sidebar: Object.assign({}, state.sidebar, { collapsed: !state.sidebar.collapsed }),
      });
    default:
      return state;
  }
}
