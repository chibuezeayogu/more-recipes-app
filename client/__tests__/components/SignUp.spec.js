import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { SignUp } from '../../Components/SignUp';
import axios from 'axios';
import imageToFormData from '../../util/ImageUpload';


const props = {
  userData: {
    isAuthenticated: true,
    currentUser: { id: 1, email: 'chibuezeayogu@hotmail.com' }
  },
  history: {
    push: jest.fn()
  },
  createAccount: jest.fn()
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'email',
    value: 'chibuezeayogu@hotmail.com',
    files: [{}]
  }
};

const state = {
  firstName: 'Chibueze',
  lastName: 'Ayogu',
  email: 'chibuezeayogu@hotmail.com',
  password: 'Abc12345.@',
  imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/' +
    'v1517769827/tvad0agtwxzucqyokktf.jpg',
  errors: {},
  disabled: false
};

describe('<SignUp />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SignUp {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<SignUp />', () => {
  it('should call handleChange function', () => {
    const wrapper = shallow(<SignUp {...props} {...state} />);
    wrapper.find('#email').simulate('change', event);
    expect(wrapper.instance().state.email).toBe('chibuezeayogu@hotmail.com');
  }
  );
});

describe('<SignUp />', () => {
  it('should call handleImageChange function', () => {
    const wrapper = shallow(<SignUp {...props} {...state} />);
    wrapper.find('#image').simulate('change', event);
    expect(wrapper.instance().state.image).toEqual({});
  });
});

describe('componentWillReceiveProps', () => {
  it('should update component with new props', () => {
    const wrapper = shallow(<SignUp {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      userData: {
        isAuthenticated: true,
        currentUser: { id: 1, email: 'chibuezeayogu@hotmail.com' }
      }
    });
    wrapper.setState({ disabled: false });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});

describe('HandleOnSubmit function', () => {
  it('should return error if input fields are empty', () => {
    const wrapper = shallow(<SignUp {...props} {...state} />);
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.errors.firstNameError)
      .toBe('first name is required');
    expect(wrapper.instance().state.errors.lastNameError)
      .toBe('last name is required');
    expect(wrapper.instance().state.errors.emailError)
      .toBe('email is required');
    expect(wrapper.instance().state.errors.passwordError)
      .toBe('password is required');
    expect(wrapper.instance().state.errors.imageError)
      .toBe('select a valid file type');
  });

  it('should return error for input did not meet the required lenght', () => {
    const wrapper = shallow(<SignUp {...props} {...state} />);
    wrapper.setState({
      firstName: 'ch',
      lastName: 'Ne',
      email: 'la',
      password: 'Noooo',
    });
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.errors.firstNameError)
      .toBe('first name must be at least 3 characters long');
    expect(wrapper.instance().state.errors.lastNameError)
      .toBe('last name must be at least 3 characters long');
    expect(wrapper.instance().state.errors.emailError)
      .toBe('email is not valide');
    expect(wrapper.instance().state.errors.passwordError)
      .toBe('password must contain `uppercase, lowercase, number, special character`');
  });

  it('should sumbit form if all conditions are meet', () => {
    const wrapper = shallow(<SignUp {...props} {...state} />);

    wrapper.setState({
      firstName: 'chibueze',
      lastName: 'Nelson',
      email: 'chibueze@hotmail.com',
      password: 'Absc.123.@',
      image: { type: 'image/png' },
    });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.instance().state.disabled).toEqual(true);
  });
});

