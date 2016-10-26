import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import uiActions from 'actions/uiActions';
import selector from './cityFilterSelector';

export function UnconnectedCityFilterContainer(props) {
  return (
    <div className="city-filter">
      <h5>Kaupunki</h5>
      <select value={props.selected} onChange={props.onSelect}>
        <option value="">Kaikki kaupungit</option>
        {props.cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
}

UnconnectedCityFilterContainer.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

const actions = {
  onSelect: (event) => {
    const value = event.target.value;
    return uiActions.changeCityFilter(value);
  },
};

export default connect(selector, actions)(UnconnectedCityFilterContainer);
