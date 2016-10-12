import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import simple from 'simple-mock';

import { UnconnectedSidebarContainer as SidebarContainer } from './SidebarContainer';

describe('screens/sidebar/SidebarContainer', () => {
  const defaultProps = {
    changeMessage: simple.stub(),
    message: 'Some message',
  };

  function getWrapper(extraProps) {
    return shallow(<SidebarContainer {...defaultProps} {...extraProps} />);
  }

  it('renders message given in props', () => {
    const content = getWrapper().text();
    expect(content).to.contain(defaultProps.message);
  });

  describe('button', () => {
    it('is rendered', () => {
      const button = getWrapper().find('button');
      expect(button).to.have.length(1);
    });

    it('gets correct onClick prop', () => {
      const button = getWrapper().find('button');
      expect(button.prop('onClick')).to.equal(defaultProps.changeMessage);
    });
  });
});
