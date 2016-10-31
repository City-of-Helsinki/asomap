import { createStructuredSelector } from 'reselect';

import selectors from 'state/selectors';

function isCollapsedSelector(state) {
  return state.ui.sidebar.collapsed;
}

export default createStructuredSelector({
  isCollapsed: isCollapsedSelector,
  isLoaded: selectors.isLoadedSelector,
});
