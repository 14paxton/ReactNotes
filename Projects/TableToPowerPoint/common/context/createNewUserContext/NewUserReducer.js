/**
 * Reducer Implementation for sharing new users.
 */

export default (state, action) => {
  switch (action.type) {
    case 'addNewUserToList':
      return {
        ...state,
        newUsersList: [action.payload, ...state.newUsersList]
      };
    case 'emptyNewUserlist':
      return {
        ...state,
        newUsersList: []
      };
    default:
      return state;
  }
};
