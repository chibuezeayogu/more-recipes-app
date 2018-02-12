import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Search } from '../../Components/Search';
import mockData from '../__mock__/actionMockData';

const props = {
  searchReducer: {
    pagination: mockData.data.pagination,
    recipes: mockData.data.recipes,
    display: 'Top Recipes'
  },
  fetchRecipesWithMostUpvote: jest.fn(),
  search: jest.fn()
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'serchTerm',
    value: 'new recipe',
  }
};
const state = {
  isLoading: false,
};

describe('<Search />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<Search />', () => {
  it('should call componentWillReceiveProps', () => {
    const wrapper = shallow(<Search {...props} {...state} />);
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
    expect(wrapper.instance().state.isLoading).toEqual(false);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});

// describe('<Search />', () => {
//   it('should call handleChange function', () => {
//     const wrapper = shallow(<Search {...props} />);
//     wrapper.find('#searchterm').simulate('change', event);
//     expect(wrapper.instance().props.search).toHaveBeenCalled();
//   });
// });
