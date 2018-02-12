import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NotFound from '../../Components/NotFound';

describe('<NotFound />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
