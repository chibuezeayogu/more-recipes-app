import expect from 'expect';
import { onPageChange, onPageReload } from '../../../util/pageFunctions';
import mockData from '../../__mock__/actionMockData';


describe('onPageChange', () => {
  it('', () => {
    expect(onPageChange(mockData.data.recipes, false, mockData.data.pagination))
      .toEqual({ isTrue: false, offset: undefined });
  });

  it('isdeleted true', () => {
    expect(onPageChange(mockData.data.recipes, true, mockData.data.pagination))
      .toEqual({ isTrue: false, offset: undefined });
  });
});

describe('onPageReload', () => {
  it('', () => {
    expect(onPageReload(1)).toEqual({ isTrue: true, offset: 0 });
  });
});
