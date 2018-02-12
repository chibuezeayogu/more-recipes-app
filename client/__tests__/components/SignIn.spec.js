import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { SignIn } from '../../Components/SignIn';
import mockData from '../__mock__/actionMockData';

const props = {
  userData: {
    isAuthenticated: false,
    currentUser: { id: 1, email: 'chibuezeayogu@hotmail.com' }
  },
  history: {
    push: jest.fn()
  },
  login: jest.fn()
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'email',
    value: 'chibuezeayogu@hotmail.com'
  }
};

const state = {
  email: 'chibuezeayogu@hotmail.com',
  password: 'Abc12345.@',
  errors: {}
};

describe('<SignIn />', () => {
  describe('SignIn Component', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<SignIn {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('handleChange', () => {
    it('should change email state to user input', () => {
      const wrapper = shallow(<SignIn {...props} {...state} />);
      wrapper.find('#email').simulate('change', event);
      expect(wrapper.instance().state.email).toBe('chibuezeayogu@hotmail.com');
    });
  });

  describe('<SignIn />', () => {
    it('should call componentWillReceiveProps ', () => {
      const wrapper = shallow(<SignIn {...props} {...state} />);
      const componentWillReceivePropsSpy = jest
        .spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.setProps({
        userData: {
          isAuthenticated: true,
          currentUser: { id: 1, email: 'chibuezeayogu@hotmail.com' }
        }
      });
      expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    });
  });

  describe('<SignIn />', () => {
    it('should handle onSubmit function', () => {
      const wrapper = shallow(<SignIn {...props} {...state} />);
      wrapper.find('form').simulate('submit', event);
      expect(wrapper.instance().state.errors.passwordError)
        .toBe('password is required');
    });
  });

  describe('handleOnsubmit()', () => {
    it('should handleObSubmit when user submits form', () => {
      const wrapper = shallow(<SignIn {...props} {...state} />);
      const login = jest.spyOn(wrapper.instance().props, 'login');
      wrapper.instance().setState({ ...state });
      wrapper.find('form').simulate('submit', event);
      expect(login).toHaveBeenCalled();
      expect(wrapper.instance().state.email).toBe('chibuezeayogu@hotmail.com');
      expect(wrapper.instance().state.password).toBe('Abc12345.@');
    });
  });
});
