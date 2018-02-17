
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { SingleRecipe } from '../../Components/SingleRecipe';
import mockData from '../__mock__/actionMockData';

const props = {
  recipeReducer: {
    isFetched: true,
    recipes: mockData.recipe,
  },
  userData: { currentUser: { id: 1, email: 'chibuezeayogu@hotmail.com' } },
  commentReducer: {
    reviews: mockData.reviews
  },
  match: {
    params: {
      id: 1
    }
  },
  postComment: jest.fn(),
  downVoteRecipe: jest.fn(),
  addOrRemoveFavourite: jest.fn(),
  fetchRecipeComment: jest.fn(),
  upVoteRecipe: jest.fn(),
  fetchRecipe: jest.fn()
};

const state = {
  isLoading: false,
  comment: '',
  errors: {}
};

describe('<SingleRecipe />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SingleRecipe {...props} {...state} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<SingleRecipe />', () => {
  it('should call componentWillReceiveProps', () => {
    const wrapper = shallow(<SingleRecipe {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.update();
    wrapper.setProps({
      ...props,
      recipeReducer: {
        isFetched: true,
        recipes: mockData.recipe,
      },
      commentReducer: {
        reviews: mockData.reviews
      },
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});

describe('<SingleRecipe />', () => {
  it('should call handleUpvote function', () => {
    const wrapper = shallow(<SingleRecipe {...props} {...state} />);
    const handleUpvoteSpy = jest.spyOn(wrapper.instance(), 'handleUpvote');
    wrapper.instance().handleUpvote();
    expect(handleUpvoteSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.upVoteRecipe).toHaveBeenCalled();
  });
});

describe('<SingleRecipe />', () => {
  it('should call handleDownvote function', () => {
    const wrapper = shallow(<SingleRecipe {...props} {...state} />);
    const handleDownvoteSpy = jest.spyOn(wrapper.instance(), 'handleDownvote');
    wrapper.instance().handleDownvote();
    expect(handleDownvoteSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.downVoteRecipe).toHaveBeenCalled();
  });
});

describe('<SingleRecipe />', () => {
  it('should call handleAddToFavourite function', () => {
    const wrapper = shallow(<SingleRecipe {...props} {...state} />);
    const handleAddToFavouriteSpy = jest
      .spyOn(wrapper.instance(), 'handleAddToFavourite');
    wrapper.instance().handleAddToFavourite();
    expect(handleAddToFavouriteSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.addOrRemoveFavourite).toHaveBeenCalled();
  });
});
