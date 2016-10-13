import queryString from 'query-string';


export function get(url, queryParams) {
  const query = queryString.stringify(queryParams);
  const baseUrl = `${SETTINGS.API_URL}${url}`;
  const fullUrl = baseUrl + (query ? `?${query}` : '');
  return window.fetch(fullUrl).then(response => response.json());
}

export default {};
