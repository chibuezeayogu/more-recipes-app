import chai from 'chai';
import paginate from '../../server/helper/paginate';

const expect = chai.expect;

describe('Pagination of fetchecd Recipes', () => {
  it('should return pagination for fetched recipes', () => {
    expect(paginate(18, 0, 10)).to.eql(
      {
        totalCount: 10, currentPage: 1, pageCount: 1, pageSize: 10
      }
    );
  });
});

