import { createStructuredSelector } from 'reselect';

function isLoadedSelector(state) {
  return Object.keys(state.data.units).length > 0;
}

export default createStructuredSelector({
  isLoaded: isLoadedSelector,
});
