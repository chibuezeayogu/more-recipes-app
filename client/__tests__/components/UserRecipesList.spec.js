import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { UserRecipesList } from '../../Components/UserRecipesList';
import mockData from '../__mock__/actionMockData';

const props = {
  userRecipeReducer: {
    recipes: [],
    pagenation: mockData.data.pagination,
    isFetched: false,
    isDeleted: false
  },
  userData: {
    currentUser: {
      id: 1,
      email: 'chibuezeayogu@hotmail.com'
    }
  },
  history: {
    push: jest.fn(),
  },
  location: {
    search: '?page=1'
  },
  fetchUserRecipes: jest.fn(),
};

describe('<RecipesList />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UserRecipesList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('componentWillReceiveProps', () => {
  it('should update component will new props', () => {
    const wrapper = shallow(<UserRecipesList {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...props, recipeReducer: { isFetched: true } });
    wrapper.setState({ isLoading: false });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.fetchUserRecipes).toHaveBeenCalled();
  });
});

describe('onChanged', () => {
  it('should navigate to different pages when clicked', () => {
    const wrapper = shallow(<UserRecipesList {...props} />);
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');

    wrapper.instance().onChange();
    expect(onChangeSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.fetchUserRecipes).toHaveBeenCalled();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });
});

