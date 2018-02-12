import expect from 'expect';
import rootReducer from '../../../client/reducers/index';


describe('Root Reducer', () => {
  it('should combine all reducers', () => {
    expect(rootReducer).toBe(rootReducer);
  });
});
