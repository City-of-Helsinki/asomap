import { expect } from 'chai';
import simple from 'simple-mock';

import { get } from './api';

describe('services/api', () => {
  describe('get', () => {
    let fetch;
    let resolve;

    beforeEach(() => {
      fetch = simple.mock(window, 'fetch')
        .returnWith(new Promise((res) => { resolve = res; }));
    });

    afterEach(() => {
      simple.restore();
    });

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
});
