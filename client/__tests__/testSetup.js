import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
// import toJson from 'enzyme-to-json';

global.process.env.CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/chibuezeayogu/upload';
global.process.env.CLOUDINARY_UPLOAD_PRESET = 'obuxro65';

const mockStore = configureStore({});

global.shallow = shallow;
global.Materialize = { toast: () => {} };
global.mockStore = mockStore;

global.$ = () => ({
  collapsible: jest.fn(),
  dropdown: jest.fn(),
  sideNav: jest.fn(),
  parallax: jest.fn()
});

global.jwt = {
  decode: jest.fn(),
  verify: jest.fn(),
};

global.localStorage = {
  clear: jest.fn(),
  setItem: jest.fn(data => data),
  getItem: jest.fn(data => data),
  removeItem: jest.fn(item => item)
};
