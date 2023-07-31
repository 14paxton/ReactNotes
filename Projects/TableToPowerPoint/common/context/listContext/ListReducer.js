export default (state, action) => {
  switch (action.type) {
    case 'setPagination':
      return {
        ...state,
        pageSize: action.payload.pageSize,
        orderByField: action.payload.orderByField,
        orderDirection: action.payload.orderDirection,
        page: action.payload.page
      };
    default:
      return state;
  }
};
