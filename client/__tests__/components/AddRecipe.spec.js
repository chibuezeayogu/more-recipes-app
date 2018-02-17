import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { AddRecipe } from '../../Components/AddRecipe';

const props = {
  recipeReducer: {
    isCreated: false
  },
  history: {
    push: jest.fn()
  },
  createAccount: jest.fn()
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'title',
    value: 'new recipe',
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
  errors: {}
};

describe('<AddRecipe />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AddRecipe {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('HandleChange', () => {
  it('should change title state to user input', () => {
    const wrapper = shallow(<AddRecipe {...props} {...state} />);
    wrapper.find('#title').simulate('change', event);
    expect(wrapper.instance().state.title).toBe('new recipe');
  });
});

describe('HandleImageChange', () => {
  it('should call set image state to user selected image', () => {
    const wrapper = shallow(<AddRecipe {...props} {...state} />);
    wrapper.find('#image').simulate('change', event);
    expect(wrapper.instance().state.image).toEqual({});
  });
});

describe('componentWillReceiveProps', () => {
  it('should update component with new state', () => {
    const wrapper = shallow(<AddRecipe {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ isCreated: true });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});

describe('handleOnSubmit', () => {
  it('should return error if input fields are empty', () => {
    const wrapper = shallow(<AddRecipe {...props} {...state} />);
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.errors.descriptionError)
      .toBe('description is required');
    expect(wrapper.instance().state.errors.ingredientsError)
      .toBe('ingredients is required');
    expect(wrapper.instance().state.errors.proceduresError)
      .toBe('procedures is required');
    expect(wrapper.instance().state.errors.imageError)
      .toBe('select a valid file type');
  });
  
  it('should return error for input did not meet the required length', () => {
    const wrapper = shallow(<AddRecipe {...props} {...state} />);
    wrapper.setState({
      title: 'abc',
      description: 'abc',
      ingredients: 'abc',
      procedures: 'abc'
    });
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.errors.titleError)
      .toBe('title must be at least 5 characters long');
    expect(wrapper.instance().state.errors.descriptionError)
      .toBe('description must be at least 5 characters long');
    expect(wrapper.instance().state.errors.ingredientsError)
      .toBe('ingredients must be at least 5 characters long');
    expect(wrapper.instance().state.errors.proceduresError)
      .toBe('procedures must be at least 5 characters long');
  });

  it('should sumbit form if all conditions are meet', () => {
    const wrapper = shallow(<AddRecipe {...props} {...state} />);
    wrapper.setState({
      title: 'recipes',
      description: 'awesome',
      ingredients: 'ingredients',
      procedures: 'procedures',
      image: { type: 'image/png' },
    });
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.disabled).toEqual(true);
  });
});

