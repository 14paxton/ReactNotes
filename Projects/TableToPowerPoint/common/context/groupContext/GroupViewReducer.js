/**
 * Reducer Implementation for Group Members List
 */

export default (state, action) => {
  switch (action.type) {
    case 'updatePagination':
      return {
        ...state,
        rowsPerPage: action.payload.rowsPerPage,
        page: action.payload.page,
        sortOrder: action.payload.sortOrder,
        orderByField: action.payload.orderByField,
        defaultTab: action.payload.defaultTab
      };
    default:
      return state;
  }
};
