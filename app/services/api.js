import capitalize from 'lodash/capitalize';
import getValue from 'lodash/get';
import keyBy from 'lodash/keyBy';
import queryString from 'query-string';

export function get(url, queryParams) {
  const query = queryString.stringify(queryParams);
  const baseUrl = `${SETTINGS.API_URL}${url}`;
  const fullUrl = baseUrl + (query ? `?${query}` : '');
  return window.fetch(fullUrl).then(response => response.json());
}

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
  const dataName = getValue(data, 'name.fi', '');
  const slashIndex = dataName.indexOf('/');
  if (slashIndex !== -1) {
    const owner = normalizeOwner(dataName.substring(0, slashIndex));
    const name = dataName.substring(slashIndex + 1);
    return { owner, name };
  }
  return {
    owner: normalizeOwner(dataName),
    name: getValue(data, 'street_address.fi', ''),
  };
}

function getUnitData(data) {
  const { owner, name } = getUnitOwnerAndName(data);
  const [longitude, latitude] = data.location ? data.location.coordinates : [];
  return {
    id: data.id,
    name,
    owner,
    streetAddress: getValue(data, 'street_address.fi', ''),
    addressZip: data.address_zip,
    city: capitalize(data.municipality),
    url: getValue(data, 'www.fi', ''),
    coordinates: { longitude, latitude },
  };
}

function getUnits() {
  const request = get(
    'unit/',
    {
      service: '76',
      only: 'name,location,street_address,address_zip,municipality,www',
      page: '1',
      page_size: '1000',
    }
  );
  return request
    .then(data => data.results)
    .then(units => keyBy(units.filter(unit => unit.location).map(getUnitData), 'id'));
}

export default { getUnits };
