import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import SmallPreloader from '../../Components/SmallPreloader';

describe('SmallPreloader', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SmallPreloader />);
    expect(wrapper).toMatchSnapshot();
  });
});
