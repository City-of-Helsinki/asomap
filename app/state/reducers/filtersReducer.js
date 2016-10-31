import values from 'lodash/values';

import actionTypes from 'actions/actionTypes';

const initialState = {
  city: '',
  owners: [],
  postalCodes: [],
  validPostalCodesByCity: {},
};

function getValidPostalCodesByCity(units) {
  const codes = {};
  values(units).forEach((unit) => {
    codes[unit.city] = codes[unit.city] || [];
    if (codes[unit.city].indexOf(unit.addressZip) === -1) {
      codes[unit.city].push(unit.addressZip);
    }
  });
  return codes;
}

function filterPostalCodes(newCity, oldState) {
  if (newCity === '') return oldState.postalCodes;
  if (oldState.city !== '') return [];
  const validPostalCodes = oldState.validPostalCodesByCity[newCity];
  return oldState.postalCodes.filter(code => validPostalCodes.indexOf(code) !== -1);
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_UNITS_SUCCESS:
      return Object.assign({}, state, {
        validPostalCodesByCity: getValidPostalCodesByCity(action.payload),
      });
    case actionTypes.CHANGE_CITY_FILTER:
      return Object.assign({}, state, {
        city: action.payload,
        postalCodes: filterPostalCodes(action.payload, state),
      });
    case actionTypes.CHANGE_OWNER_FILTER:
      return Object.assign({}, state, { owners: action.payload });
    case actionTypes.CHANGE_POSTAL_CODE_FILTER:
      return Object.assign({}, state, { postalCodes: action.payload });
    default:
      return state;
  }
}
