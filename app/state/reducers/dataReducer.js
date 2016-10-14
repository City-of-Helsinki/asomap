import capitalize from 'lodash/capitalize';
import keyBy from 'lodash/keyBy';

import actionTypes from 'actions/actionTypes';

const initialState = {
  units: {},
};

function normalizeOwner(owner) {
  switch (owner.toLowerCase()) {
    case 'avain asumisoikeus':
    case 'avain asumisoikeus oy':
      return 'AVAIN Asumisoikeus Oy';
    case 'asuntosäätiön asumisoikeus oy':
      return 'Asuntosäätiön Asumisoikeus Oy';
    case 'helsingin seudun asumisoikeusyhdistys':
    case 'helsingin seudun asumisoikeusyhdistys helas':
      return 'Helsingin Seudun Asumisoikeusyhdistys HELAS';
    case 'ta-asumisoikeus':
    case 'ta-asumisoikeus oy':
      return 'TA-Asumisoikeus Oy';
    default:
      return owner;
  }
}

function getUnitOwnerAndName(data) {
  const dataName = data.name.fi;
  const slashIndex = dataName.indexOf('/');
  if (slashIndex !== -1) {
    const owner = normalizeOwner(dataName.substring(0, slashIndex));
    const name = dataName.substring(slashIndex + 1);
    return { owner, name };
  }
  return {
    owner: normalizeOwner(dataName),
    name: data.street_address.fi,
  };
}

function getUnit(data) {
  const { owner, name } = getUnitOwnerAndName(data);
  const [longitude, latitude] = data.location.coordinates;
  return {
    id: data.id,
    name,
    owner,
    streetAddress: data.street_address.fi,
    addressZip: data.address_zip,
    city: capitalize(data.municipality),
    url: data.www_url.fi,
    coordinates: { longitude, latitude },
  };
}

function getUnits(data) {
  return keyBy(data.map(getUnit), 'id');
}

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_UNITS_SUCCESS:
      return Object.assign({}, state, { units: getUnits(action.payload) });
    default:
      return state;
  }
}
