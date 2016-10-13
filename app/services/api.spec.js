import { expect } from 'chai';
import simple from 'simple-mock';

import api, { get } from './api';

describe('services/api', () => {
  let fetch;
  let resolve;

  beforeEach(() => {
    fetch = simple.mock(window, 'fetch')
      .returnWith(new Promise((res) => { resolve = res; }));
  });

  afterEach(() => {
    simple.restore();
  });

  describe('get', () => {
    it('calls window.fetch', () => {
      get('test-url');
      expect(fetch.callCount).to.equal(1);
      expect(fetch.lastCall.args).to.deep.equal([
        `${SETTINGS.API_URL}test-url`,
      ]);
    });

    it('handles query params', () => {
      get('test-url', { a: '1', b: '2,3' });
      expect(fetch.callCount).to.equal(1);
      expect(fetch.lastCall.args).to.deep.equal([
        `${SETTINGS.API_URL}test-url?a=1&b=2%2C3`,
      ]);
    });

    it('resolves promise with json', (done) => {
      const expected = { some: 'data' };
      const response = { json: () => expected };
      const promise = get('test-url');
      promise.then((actual) => {
        expect(actual).to.equal(expected);
        done();
      });
      resolve(response);
    });
  });

  describe('getUnits', () => {
    it('uses the correct URL', () => {
      const expected =
        'https://mock-api.fi/unit/?' +
        'only=name%2Clocation%2Cstreet_address%2Caddress_zip%2Cmunicipality%2Cwww_url&' +
        'page=1&page_size=1000&service=25304';
      api.getUnits();
      expect(fetch.callCount).to.equal(1);
      const actual = fetch.lastCall.arg;
      expect(actual).to.equal(expected);
    });

    it('returns results', (done) => {
      const expected = { some: 'results' };
      const response = { json: () => ({ results: expected }) };
      const promise = api.getUnits();
      promise.then((actual) => {
        expect(actual).to.equal(expected);
        done();
      });
      resolve(response);
    });
  });
});
