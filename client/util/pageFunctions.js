import lodash from 'lodash';

/**
*
* @description on delete check if the page still contains a recipe
* else go to page one
*
* @param {Integer} recipes - active page in pagination
*
* @param {boolean} isDeleted
*
* @param {Object} pagination
*
* @returns {Object} payload - returns page offset and boolean
*
*/
export const onPageChange = (recipes, isDeleted, pagination) => {
  let offset,
    isTrue = false;
  if (isDeleted && recipes.length < 6 &&
      pagination.currentPage === 1 && pagination.totalCount > 6) {
    isTrue = true;
    offset = 0;
  } else if (isDeleted && recipes.length < 1 &&
      pagination.currentPage !== 1) {
    offset = (pagination.currentPage - 2) * 6;
    isTrue = true;
  }

  return { isTrue, offset };
};


/**
 *
 * @description on page reload check get the current page
 *
 * @param {Integer} currentPage - active page in pagination
 *
 * @returns {Object} payload - returns page offset and boolean
 *
 */
export const onPageReload = (currentPage) => {
  let offset,
    isTrue = false;
  if (Number(currentPage) && Number(currentPage) > 0) {
    offset = 6 * (currentPage - 1);
    isTrue = true;
  } else {
    isTrue = true;
    offset = 0;
  }

  return { isTrue, offset };
};
