import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import selector from './cityFilterSelector';

export function UnconnectedCityFilterContainer(props) {
  return (
    <select className="city-filter" value="">
      <option>Kaikki kaupungit</option>
      {props.cities.map(city => (
        <option key={city} value={city}>{city}</option>
      ))}
    </select>
  );
}

UnconnectedCityFilterContainer.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(selector)(UnconnectedCityFilterContainer);
