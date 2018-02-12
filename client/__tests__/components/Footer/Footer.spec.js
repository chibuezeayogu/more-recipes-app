import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Footer from '../../../Components/Footer/Footer';

describe('Footer', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
