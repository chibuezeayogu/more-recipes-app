import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Home from '../../Components/Home';

describe('<Home />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div').length).toBe(24);
  });
});
