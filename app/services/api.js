import queryString from 'query-string';


export function get(url, queryParams) {
  const query = queryString.stringify(queryParams);
  const baseUrl = `${SETTINGS.API_URL}${url}`;
  const fullUrl = baseUrl + (query ? `?${query}` : '');
  return window.fetch(fullUrl).then(response => response.json());
}

function getUnits() {
  return get(
    'unit/',
    {
      service: '25304',
      only: 'name,location,street_address,address_zip,municipality,www_url',
      page: '1',
      page_size: '1000',
    }
  ).then(data => data.results);
}

export default { getUnits };
