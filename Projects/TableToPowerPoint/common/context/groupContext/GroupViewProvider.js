import React, {useReducer} from 'react';
import GroupViewReducer from './GroupViewReducer';
import GroupViewContext from './GroupViewContext';

/**
 * Provider Implementation for table properties for members
 */
const GroupViewProvider = (props) => {
    const {groupName} = props
    const initialState = {
        rowsPerPage: 5, page: 0, sortOrder: 'asc', orderByField: 0, defaultTab: '0',
        groupName:   groupName
                     ? groupName
                     : ''
    };

    const [state, dispatch] = useReducer(GroupViewReducer, initialState);

    const updatePagination = (obj) => {
        const paginationObj = {
            rowsPerPage: obj?.rowsPerPage !== undefined
                         ? obj?.rowsPerPage
                         : 5,
            page: obj?.page !== undefined
                  ? obj?.page
                  : 0,
            sortOrder: obj?.sortOrder !== undefined
                       ? obj?.sortOrder
                       : 'asc',
            orderByField: obj?.orderByField !== undefined
                          ? obj?.orderByField
                          : 0,
            defaultTab: obj?.defaultTab !== undefined
                        ? obj?.defaultTab
                        : '0'
        };

        dispatch({
            type: 'updatePagination', payload: paginationObj
        });
    };

    return (<GroupViewContext.Provider
        value={{
            groupName: state?.groupName,
            rowsPerPage: state.rowsPerPage,
            page: state.page,
            sortOrder: state.sortOrder,
            orderByField: state.orderByField,
            defaultTab: state.defaultTab,
            updatePagination
        }}
    >
        {props.children}
    </GroupViewContext.Provider>);
};

export default GroupViewProvider;
