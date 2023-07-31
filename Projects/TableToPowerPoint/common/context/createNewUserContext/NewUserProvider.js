import React, { useReducer } from 'react';
import NewUserReducer from './NewUserReducer';
import NewUserContext from './NewUserContext';

/**
 * Provider Implementation for sharing new user.
 */
const NewUserProvider = (props) => {
  const initialState = {
    newUsersList: []
  };

  const [state, dispatch] = useReducer(NewUserReducer, initialState);

  const addNewUserToList = (user) => {
    dispatch({
      type: 'addNewUserToList',
      payload: user
    });
  };

  const emptyNewUserlist = () => {
    dispatch({
      type: 'emptyNewUserlist'
    });
  };

  return (
    <NewUserContext.Provider
      value={{
        newUsersList: state.newUsersList,
        addNewUserToList,
        emptyNewUserlist
      }}
    >
      {props.children}
    </NewUserContext.Provider>
  );
};

export default NewUserProvider;
