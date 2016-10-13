import { expect } from 'chai';
import simple from 'simple-mock';

import apiService from 'services/api';
import actions from './apiActions';

describe('actions/apiActions', () => {
  describe('getUnits', () => {
    let successCallback;
    let errorCallback;

    before(() => {
      simple.mock(apiService, 'getUnits')
        .returnWith({
          then(fn) { successCallback = fn; return this; },
          catch(fn) { errorCallback = fn; return this; },
        });
    });

    after(() => {
      simple.restore();
    });

    it('returns a thunk', () => {
      const actual = actions.getUnits();
      expect(actual).to.be.a('function');
      expect(actual.length).to.equal(1);
    });

    describe('thunk', () => {
      let thunk;

      before(() => {
        thunk = actions.getUnits();
      });

      it('dispatches a request action', () => {
        const dispatch = simple.mock();
        thunk(dispatch);
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.lastCall.args).to.deep.equal([
          { type: 'GET_UNITS_REQUEST' },
        ]);
      });

      it('dispatches a success action when resolved', () => {
        const payload = { data: 3 };
        const dispatch = simple.mock();
        thunk(dispatch);
        dispatch.reset();
        successCallback(payload);
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.lastCall.args).to.deep.equal([
          { type: 'GET_UNITS_SUCCESS', payload },
        ]);
      });

      it('dispatches an error action when rejected', () => {
        const payload = { error: true };
        const dispatch = simple.mock();
        thunk(dispatch);
        dispatch.reset();
        errorCallback(payload);
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.lastCall.args).to.deep.equal([
          { type: 'GET_UNITS_ERROR', payload },
        ]);
      });
    });
  });
});
