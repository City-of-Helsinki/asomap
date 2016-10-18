import { expect } from 'chai';

import createSelector from './popupSelector';

describe('screens/map/popup/popupSelector', () => {
  it('selects data based on id', () => {
    const units = {
      21: {
        id: 21,
        name: 'Unit name',
        owner: 'Unit owner',
        streetAddress: 'Unit address',
        addressZip: '00100',
        city: 'Helsinki',
        url: 'http://owner.example.com',
      },
      2: {
        id: 2,
        name: 'Bad name',
        owner: 'Bad owner',
        streetAddress: 'Bad address',
        addressZip: '11011',
        city: 'Bad City',
        url: 'http://bad.example.com',
      },
    };
    const selector = createSelector();
    const actual = selector({ data: { units } }, { id: '21' });
    expect(actual).to.deep.equal({
      name: 'Unit name',
      owner: 'Unit owner',
      streetAddress: 'Unit address',
      addressZip: '00100',
      city: 'Helsinki',
      url: 'http://owner.example.com',
    });
  });
});
