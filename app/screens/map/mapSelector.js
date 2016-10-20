import pickBy from 'lodash/pickBy';

import { createSelector, createStructuredSelector } from 'reselect';

function unitsSelector(state) {
  return state.data.units;
}

function cityFilterSelector(state) {
  return state.filters.city;
}

const filteredUnitsSelector = createSelector(
  unitsSelector,
  cityFilterSelector,
  (units, cityFilter) => pickBy(units, unit => cityFilter === '' || unit.city === cityFilter)
);

const markersSelector = createSelector(
  filteredUnitsSelector,
  (units) => {
    const ids = Object.keys(units).sort();
    return ids.map(id => ({
      id,
      latitude: units[id].coordinates.latitude,
      longitude: units[id].coordinates.longitude,
    }));
  }
);

const boundariesSelector = createSelector(
  markersSelector,
  (markers) => {
    let maxLatitude;
    let minLatitude;
    let maxLongitude;
    let minLongitude;
    for (const marker of markers) {
      if (maxLatitude === undefined || marker.latitude > maxLatitude) {
        maxLatitude = marker.latitude;
      }
      if (minLatitude === undefined || marker.latitude < minLatitude) {
        minLatitude = marker.latitude;
      }
      if (maxLongitude === undefined || marker.longitude > maxLongitude) {
        maxLongitude = marker.longitude;
      }
      if (minLongitude === undefined || marker.longitude < minLongitude) {
        minLongitude = marker.longitude;
      }
    }
    return {
      maxLatitude,
      minLatitude,
      maxLongitude,
      minLongitude,
    };
  }
);

const isLoadedSelector = createSelector(
  unitsSelector,
  units => Object.keys(units).length > 0
);

export default createStructuredSelector({
  isLoaded: isLoadedSelector,
  markers: markersSelector,
  boundaries: boundariesSelector,
});
