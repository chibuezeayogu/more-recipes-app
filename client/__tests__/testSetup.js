import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-15';
// import toJson from 'enzyme-to-json';

global.process.env.CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/chibuezeayogu/upload';
global.process.env.CLOUDINARY_UPLOAD_PRESET = 'obuxro65';


global.shallow = shallow;
global.Materialize = { toast: () => {} };


global.localStorage = {
  clear: jest.fn(),
  setItem: jest.fn(data => data),
  getItem: jest.fn(data => data),
  removeItem: jest.fn(item => item)
};

global.jwt = {
decode: jest.fn(),
verify: jest.fn(),
} 
global.document.getElementById = () => ({ innerHTML: '' });
global.$ = () => ({
  sideNav: jest.fn(),
  collapsible: jest.fn(),
  dropdown: jest.fn(),
});

// configure({ adapter: new Adapter() });
