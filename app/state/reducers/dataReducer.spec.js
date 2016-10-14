import { expect } from 'chai';

import actionTypes from 'actions/actionTypes';
import reducer from './dataReducer';

describe('state/reducers/dataReducer', () => {
  describe('GET_UNITS_SUCCESS', () => {
    function createAction(payload) {
      return {
        type: actionTypes.GET_UNITS_SUCCESS,
        payload,
      };
    }

    function createSimpleAction(extra) {
      const data = Object.assign(
        {
          id: 21,
          name: { fi: 'Unit owner/Unit name' },
          street_address: { fi: 'Unit address' },
          address_zip: '00100',
          municipality: 'helsinki',
          www_url: { fi: 'http://owner.talo' },
          location: { coordinates: [1, 2] },
        },
        extra
      );
      return createAction([data]);
    }

    function createSimpleData(extra) {
      return Object.assign(
        {
          id: 21,
          name: 'Unit name',
          owner: 'Unit owner',
          streetAddress: 'Unit address',
          addressZip: '00100',
          city: 'Helsinki',
          url: 'http://owner.talo',
          coordinates: { longitude: 1, latitude: 2 },
        },
        extra
      );
    }

    function testPopulating(actionData, expected) {
      const action = createSimpleAction(actionData);
      const actual = reducer(null, action).units[21];
      for (const key of Object.keys(expected)) {
        expect(actual[key]).to.deep.equal(expected[key]);
      }
    }

    it('populates streetAddress', () => {
      testPopulating(
        { street_address: { fi: 'Address' } },
        { streetAddress: 'Address' }
      );
    });

    it('populates addressZip', () => {
      testPopulating(
        { address_zip: '12345' },
        { addressZip: '12345' }
      );
    });

    it('populates city', () => {
      testPopulating(
        { municipality: 'espoo' },
        { city: 'Espoo' }
      );
    });

    it('populates url', () => {
      testPopulating(
        { www_url: { fi: 'http://test.example.com' } },
        { url: 'http://test.example.com' }
      );
    });

    it('populates coordinates', () => {
      testPopulating(
        { location: { coordinates: [10, 20] } },
        { coordinates: { longitude: 10, latitude: 20 } }
      );
    });

    it('populates owner and name', () => {
      testPopulating(
        { name: { fi: 'Owner' }, street_address: { fi: 'Talotie 5' } },
        { name: 'Talotie 5', owner: 'Owner' }
      );
    });

    it('splits name to owner and name', () => {
      const action = createSimpleAction({
        name: { fi: 'Owner/House' },
      });
      const expected = createSimpleData({
        name: 'House',
        owner: 'Owner',
      });
      expect(reducer(null, action)).to.deep.equal({
        units: { 21: expected },
      });
    });

    it('splits correctly with multiple slashes', () => {
      const action = createSimpleAction({
        name: { fi: 'Owner/House/House Nick' },
      });
      const expected = createSimpleData({
        name: 'House/House Nick',
        owner: 'Owner',
      });
      expect(reducer(null, action)).to.deep.equal({
        units: { 21: expected },
      });
    });

    it('normalizes owner names', () => {
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
      for (const test of tests) {
        const action = createSimpleAction({ name: { fi: test.name } });
        const expected = createSimpleData({
          owner: test.expected,
          name: 'Unit address',
        });
        expect(reducer(null, action)).to.deep.equal({
          units: { 21: expected },
        });
      }
    });
  });
});
