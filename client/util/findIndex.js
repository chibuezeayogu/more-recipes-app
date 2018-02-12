/**
 *
 * @param {Any} reducer - recipe reduer
 *
 * @param {Integer} id - recipe id
 *
 */

const findIndex = (reducer, id) => (
  reducer.findIndex(reducer => reducer.id === parseInt(id, 10))
);

export default findIndex;
