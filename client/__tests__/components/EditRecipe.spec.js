import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { EditRecipe } from '../../Components/EditRecipe';
import mockData from '../__mock__/actionMockData';

const props = {
  userRecipeReducer: {
    isFetched: false,
    isUpdated: false,
    recipes: []
  },
  history: {
    push: jest.fn(),
    goBack: jest.fn()
  },
  match: {
    params: {
      id: 1
    }
  },
  editRecipe: jest.fn(),
  fetchRecipe: jest.fn()
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'title',
    value: 'new title',
    files: [{}]
  }
};

const state = {
  id: '',
  title: '',
  description: '',
  ingredients: '',
  procedures: '',
  imageUrl: '',
  image: {},
  errors: {},
  disabled: false,
};

describe('<EditRecipe />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<EditRecipe {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<EditRecipe />', () => {
  it('should call handleChange function', () => {
    const wrapper = shallow(<EditRecipe {...props} {...state} />);
    wrapper.find('#title').simulate('change', event);
    expect(wrapper.instance().state.title).toEqual('new title');
  });
});

describe('HandleImageChange', () => {
  it('should set image state to user selected image', () => {
    const wrapper = shallow(<EditRecipe {...props} {...state} />);
    wrapper.find('#image').simulate('change', event);
    expect(wrapper.instance().state.image).toEqual({});
  });
});

describe('componentWillReceiveProps', () => {
  it('should call update component with new props', () => {
    const wrapper = shallow(<EditRecipe {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      isFetched: true,
      isUpdated: true,
      recipes: mockData.recipe,
      match: { params: { id: 1 } },
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});

describe('HandleOnSubmit', () => {
  it('should return error if input fields are empty', () => {
    const wrapper = shallow(<EditRecipe {...props} {...state} />);
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.instance().state.errors.descriptionError)
      .toBe('description is required');
    expect(wrapper.instance().state.errors.ingredientsError)
      .toBe('ingredients is required');
    expect(wrapper.instance().state.errors.proceduresError)
      .toBe('procedures is required');
  });

  it('should return error for input did not meet the required lenght', () => {
    const wrapper = shallow(<EditRecipe {...props} {...state} />);
    wrapper.setState({
      title: 'abc',
      description: 'abc',
      ingredients: 'abc',
      procedures: 'abc',
    });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
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
    const wrapper = shallow(<EditRecipe {...props} {...state} />);
    wrapper.setState({
      title: 'recipes',
      description: 'awesome',
      ingredients: 'ingredients',
      procedures: 'procedures',
      image: { name: 'image', type: 'image/png' },
    });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.instance().state.disabled).toEqual(true);
  });
});
