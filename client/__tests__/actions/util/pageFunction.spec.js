import expect from 'expect';
import { onPageChange, onPageReload } from '../../../util/pageFunctions';
import mockData from '../../__mock__/actionMockData';


describe('onPageChange', () => {
  it('should handle page change function', () => {
    expect(onPageChange(mockData.data.recipes, false, mockData.data.pagination))
      .toEqual({ isTrue: false, offset: undefined });
  });

  it('should navigate to next page if the last recipe is deleted on a page',
    () => {
      expect(onPageChange(mockData.data.recipes, true, mockData.data.pagination))
        .toEqual({ isTrue: false, offset: undefined });
    });
});

describe('onPageReload', () => {
  it('should keep users on current page on page reload', () => {
    expect(onPageReload(1)).toEqual({ isTrue: true, offset: 0 });
  });
});
