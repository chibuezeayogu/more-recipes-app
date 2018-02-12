import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Menu } from '../../../Components/Header/Menu';

describe('<Menu />', () => {
  it('render the menu Component', () => {
    const wrapper = shallow(<Menu />);
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Menu />', () => {
  it('shoud call componentDidMount', () => {
    const wrapper = shallow(<Menu />);
    wrapper.instance().componentDidMount();
  });
});

