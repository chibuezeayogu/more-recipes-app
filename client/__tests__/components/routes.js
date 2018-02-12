import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Routes from '../../Routes';

describe('Routes', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});
