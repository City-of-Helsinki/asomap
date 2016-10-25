import { createStructuredSelector } from 'reselect';

function isLoadedSelector(state) {
  return Object.keys(state.data.units).length > 0;
}

function isCollapsedSelector(state) {
  return state.ui.sidebar.collapsed;
}

export default createStructuredSelector({
  isCollapsed: isCollapsedSelector,
  isLoaded: isLoadedSelector,
});
