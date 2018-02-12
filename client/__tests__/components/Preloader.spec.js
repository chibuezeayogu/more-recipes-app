import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Preloder from '../../Components/Preloder';

describe('<Preloder />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Preloder />);
    expect(wrapper).toMatchSnapshot();
  });
});
