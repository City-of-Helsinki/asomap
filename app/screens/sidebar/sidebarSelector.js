import { createSelector } from 'reselect';

const messageSelector = state => state.example.message;

const sidebarSelector = createSelector(
  messageSelector,
  message => ({ message })
);

export default sidebarSelector;
