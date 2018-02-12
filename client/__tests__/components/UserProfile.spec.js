import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import mochData from '../__mock__/actionMockData';
import { UserProfile } from '../../Components/UserProfile';

const props = {
  userData: {
    isAuthenticated: true,
    currentUser: {
      id: 1,
      email: 'chibuezeayogu@hotmail.com'
    }
  },
  editProfile: jest.fn(),
  fetchUser: jest.fn()
};

const state = {
  disabled: false,
  id: '',
  firstName: '',
  lastName: '',
  phone: '',
  location: '',
  address: '',
  isLoading: false,
  errors: {},
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'firstName',
    value: 'Nelson',
    files: [{}]
  }
};

describe('<UserProfile />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('componentWillReceiveProps', () => {
  it('should update component with new props', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      ...props,
      userData:
      {
        currentUser: mochData.userEdit
      }
    });
    wrapper.setState({ disabled: true });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});

describe('handleEdit function', () => {
  it('should set input field to editable', () => {
    const wrapper = shallow(<UserProfile {...props} {...state} />);
    wrapper.find('#edit').simulate('click', event);
    expect(wrapper.instance().state.disabled).toEqual(false);
  });
});

describe('handleCancel function', () => {
  it('should set input field to readonly', () => {
    const wrapper = shallow(<UserProfile {...props} {...state} />);
    wrapper.find('#cancel').simulate('click', event);
    expect(wrapper.instance().state.disabled).toEqual(true);
  });
});

describe('handleImageChange function', () => {
  it('should set image state to user selected image', () => {
    const wrapper = shallow(<UserProfile {...props} {...state} />);
    wrapper.find('#image').simulate('change', event);
    expect(wrapper.instance().state.image).toEqual({});
  });
});

describe('handleChange function', () => {
  it('should add user details to state', () => {
    const wrapper = shallow(<UserProfile {...props} {...state} />);
    wrapper.find('#firstName').simulate('change', event);
    expect(wrapper.instance().state.firstName).toBe('Nelson');
  }
  );
});

describe('handleOnSubmit function', () => {
  it('should call handleChange function', () => {
    const wrapper = shallow(<UserProfile {...props} {...state} />);
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.errors.firstNameError)
      .toBe('first name is required');
  });

  it('should call handleChange function', () => {
    const wrapper = shallow(<UserProfile {...props} {...state} />);
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.errors.firstNameError)
      .toBe('first name is required');
  });
});

describe('HandleOnSubmit function', () => {
  it('should return error if input fields are empty', () => {
    const wrapper = shallow(<UserProfile {...props} {...state} />);
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.errors.firstNameError)
      .toBe('first name is required');
    expect(wrapper.instance().state.errors.lastNameError)
      .toBe('last name is required');
    expect(wrapper.instance().state.errors.locationError)
      .toBe('location is required');
    expect(wrapper.instance().state.errors.addressError)
      .toBe('address is required');
    expect(wrapper.instance().state.errors.phoneError)
      .toBe('phone number is required');
  });

  it('should return error for input did not meet the required lenght', () => {
    const wrapper = shallow(<UserProfile {...props} {...state} />);
    wrapper.setState({
      firstName: 'ch',
      lastName: 'Ne',
      location: 'la',
      address: 'No',
      phone: 'pppp',
    });
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.errors.firstNameError)
      .toBe('first name must be at least 3 characters long');
    expect(wrapper.instance().state.errors.lastNameError)
      .toBe('last name must be at least 3 characters long');
    expect(wrapper.instance().state.errors.locationError)
      .toBe('location must be at least 5 characters long');
    expect(wrapper.instance().state.errors.addressError)
      .toBe('address name must be at least 8 characters long');
    expect(wrapper.instance().state.errors.phoneError)
      .toBe('phone value must be numbers');
  });

  it('should sumbit form if all conditions are meet', () => {
    const wrapper = shallow(<UserProfile {...props} {...state} />);
    wrapper.setState({
      firstName: 'chibueze',
      lastName: 'Nelson',
      location: 'lagos, Nigeria',
      address: 'No 1 Aminu street Mende',
      phone: '07033297338',
      image: { name: 'image', type: 'image/png' },
    });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.instance().state.disabled).toEqual(true);
  });
});
