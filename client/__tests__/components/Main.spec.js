import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Main } from '../../Components/Main';

const props = {
  userData: {
    isAuthenticated: true,
    currentUser: { id: 1, email: 'chibuezeayogu@hotmail.com' }
  },
  history: {
    push: jest.fn()
  },
};

describe('<Main />', () => {
  it('should render Main Component', () => {
    const wrapper = shallow(<Main {...props} />);
    wrapper.instance().componentDidMount();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Main />', () => {
  it('should call componentWillMount', () => {
    const componentWillMountSpy = jest
      .spyOn(Main.prototype, 'componentWillMount');
    const wrapper = shallow(<Main {...props} />);
    expect(componentWillMountSpy).toHaveBeenCalled();
  });
});

