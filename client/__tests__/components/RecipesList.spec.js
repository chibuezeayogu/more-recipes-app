import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { RecipesList } from '../../Components/RecipesList';
import mockData from '../__mock__/actionMockData';

const props = {
  recipeReducer: {
    recipes: [],
    pagination: {},
    isFetched: false
  },
  history: {
    push: jest.fn(),
  },
  location: {
    search: '?page=1',
  },
  fetchAllRecipes: jest.fn(),
};

describe('<RecipesList />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RecipesList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<RecipesList />', () => {
  it('should call componentWillReceiveProps', () => {
    const wrapper = shallow(<RecipesList {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      ...props,
      recipeReducer:
      {
        isFetched: true,
        recipes: mockData.data.recipes,
        pagination: mockData.data.pagination
      }
    });
    wrapper.setState({ isLoading: false });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});

describe('<RecipesList />', () => {
  it('should call onChanged function', () => {
    const wrapper = shallow(<RecipesList {...props} />);
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');

    wrapper.instance().onChange();
    expect(onChangeSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.fetchAllRecipes).toHaveBeenCalled();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });
});
