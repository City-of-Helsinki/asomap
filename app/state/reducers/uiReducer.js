import actionTypes from 'actions/actionTypes';

function isMobile() {
  return window.innerWidth <= 768;
}

const initialState = {
  sidebar: {
    collapsed: isMobile(),
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
