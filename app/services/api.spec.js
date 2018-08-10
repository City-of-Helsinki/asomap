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
        'only=name%2Clocation%2Cstreet_address%2Caddress_zip%2Cmunicipality%2Cwww&' +
        'page=1&page_size=1000&service=76';
      api.getUnits();
      expect(fetch.callCount).to.equal(1);
      const actual = fetch.lastCall.arg;
      expect(actual).to.equal(expected);
    });

    function testPopulating(result, expected, done) {
      const response = {
        json: () => ({
          results: [
            Object.assign(
              {
                address_zip: '00100',
                id: '1',
                location: {
                  coordinates: [1, 2],
                },
                municipality: 'helsinki',
                name: {
                  fi: 'Unit name',
                },
                street_address: {
                  fi: 'Unit address',
                },
                www_url: {
                  fi: 'http://www.example.com',
                },
              },
              result
            ),
          ],
        }),
      };
      const promise = api.getUnits();
      promise.then((actual) => {
        for (const key of Object.keys(expected)) {
          expect(actual['1'][key]).to.deep.equal(expected[key]);
        }
        done();
      });
      resolve(response);
    }

    it('populates streetAddress', (done) => {
      testPopulating(
        { street_address: { fi: 'Address' } },
        { streetAddress: 'Address' },
        done
      );
    });

    it('populates addressZip', (done) => {
      testPopulating(
        { address_zip: '12345' },
        { addressZip: '12345' },
        done
      );
    });

    it('populates city', (done) => {
      testPopulating(
        { municipality: 'espoo' },
        { city: 'Espoo' },
        done
      );
    });

    it('populates url', (done) => {
      testPopulating(
        { www: { fi: 'http://test.example.com' } },
        { url: 'http://test.example.com' },
        done
      );
    });

    it('populates coordinates', (done) => {
      testPopulating(
        { location: { coordinates: [10, 20] } },
        { coordinates: { longitude: 10, latitude: 20 } },
        done
      );
    });

    it('populates owner and name', (done) => {
      testPopulating(
        { name: { fi: 'Owner' }, street_address: { fi: 'Talotie 5' } },
        { name: 'Talotie 5', owner: 'Owner' },
        done
      );
    });

    it('splits name to owner and name', (done) => {
      testPopulating(
        { name: { fi: 'Owner/House' } },
        { name: 'House', owner: 'Owner' },
        done
      );
    });

    it('splits correctly with multiple slashes', (done) => {
      testPopulating(
        { name: { fi: 'Owner/House/Stair' } },
        { name: 'House/Stair', owner: 'Owner' },
        done
      );
    });

    const tests = [
      { name: 'AVAIN asumisOIKEUS', expected: 'AVAIN Asumisoikeus Oy' },
      { name: 'AVAIN ASUMISOIKEUS OY', expected: 'AVAIN Asumisoikeus Oy' },
      { name: 'asuntoSÄÄTIÖN asumisoikeus OY', expected: 'Asuntosäätiön Asumisoikeus Oy' },
      { name: 'helsingin seudun asumisoikeusyhdistys',
        expected: 'Helsingin Seudun Asumisoikeusyhdistys HELAS' },
      { name: 'Helsingin Seudun Asumisoikeusyhdistys helas',
        expected: 'Helsingin Seudun Asumisoikeusyhdistys HELAS' },
      { name: 'TA-Asumisoikeus', expected: 'TA-Asumisoikeus Oy' },
      { name: 'TA-Asumisoikeus OY', expected: 'TA-Asumisoikeus Oy' },
    ];
    tests.map(test => it(`normalizes owner "${test.name}"`, (done) => {
      testPopulating(
        { name: { fi: test.name } },
        { owner: test.expected, name: 'Unit address' },
        done
      );
    }));
  });
});
