import verifyToken from '../../../util/verifyToken';
import expect from 'expect';
import store from '../../../store';

describe('VerifyToken', () => {
  it('should verify token, set current user or logout user ', () => {
    expect(verifyToken(store)).toEqual();
  });
});

