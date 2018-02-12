import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { UserMenu } from '../../../Components/Header/UserMenu';

const props = {
  userData: { currentUser: { id: 1, email: 'chibuezeayogu@hotmail.com' } },
  signOut: jest.fn(),
  history: {
    push: jest.fn()
  },
};

describe('UserMenu Component', () => {
  it('render the user menu without crashing', () => {
    const wrapper = shallow(<UserMenu {...props} />);
    wrapper.instance().componentDidMount();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<UserMenu />', () => {
  it('shoud call logout function', () => {
    const wrapper = shallow(<UserMenu {...props} />);
    const logoutSpy = jest.spyOn(wrapper.instance(), 'logout');
    wrapper.instance().logout();
    expect(logoutSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.signOut).toHaveBeenCalled();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });
});
