import actionTypes from 'actions/actionTypes';

function isMobile() {
  return window.innerWidth <= 768;
}

function getInitialState() {
  return {
    sidebar: {
      collapsed: isMobile(),
    },
  };
}

function toggleSidebar(state, collapsed) {
  return Object.assign({}, state, {
    sidebar: Object.assign({}, state.sidebar, { collapsed }),
  });
}

export default function uiReducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR:
      return toggleSidebar(state, !state.sidebar.collapsed);
    case actionTypes.CHANGE_CITY_FILTER:
    case actionTypes.CHANGE_POSTAL_CODE_FILTER:
    case actionTypes.CHANGE_OWNER_FILTER:
      if (isMobile()) return toggleSidebar(state, true);
      return state;
    default:
      return state;
  }
}
