import { expect } from 'chai';

import actionTypes from 'actions/actionTypes';
import reducer from './dataReducer';

describe('state/reducers/dataReducer', () => {
  describe('GET_UNITS_SUCCESS', () => {
    it('populates units', () => {
      const payload = { 1: { some: 'data' } };
      const actual = reducer(undefined, {
        type: 'GET_UNITS_SUCCESS',
        payload,
      });
      expect(actual.units).to.equal(payload);
    });
  });
});
