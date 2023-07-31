import React from 'react';
import ListContext from './ListContext';

const ListProvider = (props) => {
  const compareSessionWithFormParams = (formParam) => {
    const sessionParam = JSON.parse(sessionStorage.getItem('listPagination'));
    return (
      sessionParam?.pageSize === formParam?.pageSize &&
      sessionParam?.orderByField === formParam?.orderByField &&
      sessionParam?.orderDirection === formParam?.orderDirection &&
      sessionParam?.page === formParam?.page
    );
  };

  const setPaginationParams = (paginationObj) => {
    let p = JSON.parse(sessionStorage.getItem('listPagination'));

    sessionStorage.setItem('listPagination', JSON.stringify(paginationObj));
  };

  return (
    <ListContext.Provider
      value={{
        setPaginationParams
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListProvider;
