import lodash from 'lodash';


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

  return { isTrue,  offset };
};
