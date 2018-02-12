import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { UserFavouritesList } from '../../Components/UserFavouritesList';
import mockData from '../__mock__/actionMockData';

const props = {
  favouriteReducer: {
    favourites: mockData.data.recipes,
    pagination: mockData.data.pagination,
    isFetched: false,
    isDeleted: false
  },
  userData: {
    currentUser: {}
  },
  history: {
    push: jest.fn(),
  },
  location: {
    search: '?page=1'
  },
  fetchUserFavourites: jest.fn(),
};

describe('<UserFavouritesList />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UserFavouritesList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('componentWillReceiveProps', () => {
  it('should update component with new props', () => {
    const wrapper = shallow(<UserFavouritesList {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      favouriteReducer: {
        isFetched: true,
        isDeleted: true,
        favourites: mockData.data.recipes,
        pagination: mockData.data.pagination
      }
    });
    wrapper.setState({ isLoading: false });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
});

describe('<UserFavouritesList />', () => {
  it('should call onChanged function', () => {
    const wrapper = shallow(<UserFavouritesList {...props} />);
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');

    wrapper.instance().onChange();
    expect(onChangeSpy).toHaveBeenCalled();
    expect(wrapper.instance().props.fetchUserFavourites).toHaveBeenCalled();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });
});

