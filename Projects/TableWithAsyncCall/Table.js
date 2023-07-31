import React, { forwardRef, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { useFormatMessage } from '../../../../i18n/i18n.util';
import { Card, CardContent, styled, ThemeProvider, Typography, useTheme, Icon } from '@material-ui/core';
import ViewGroupButton from '../common/ViewGroupButton';
import EmptyGroupTable from '../common/EmptyGroupTable';
import CompareGroupsButton from '../common/CompareGroupsButton';
import { FormattedMessage } from 'react-intl';
import { viewGroup } from '../../helper/groups.helper';
import PrivateTableTitle from '../common/PrivateTableTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockAlt, faLockOpen } from '@fortawesome/pro-regular-svg-icons/';
import { Tooltip } from '@talentplus/formation-ui';
import dayjs from 'dayjs';
import history from '../../../../history';
import { GROUP_TABS, INTERNAL_ROUTES } from '../../../../common/util/group.utils';
import TablePagination from '../../../../common/Table/TablePagination';
import { fetchUserGroupsPagination } from '../../../../common/util/externalAPIs';

const PaginationContainer = styled('div')(({ theme }) => ({
  align: 'center',
  paddingLeft: '10px',
  paddingRight: '15px',
  backgroundColor: `${theme.palette.primary[10]}`
}));

const columns = [
  {
    field: 'groupName',
    title: <span data-qa={'private-groups-group-name-title'}>Group Name</span>,
    width: '35%',
    defaultSort: 'asc',
    render: (rowData) => (
      <span data-qa={`private-groups-group-name-cell-${rowData?.tableData?.id}`}>{rowData?.groupName}</span>
    )
  },
  {
    field: 'assessmentName',
    title: <span data-qa={'private-groups-assessment-name-title'}>Assessment Name</span>,
    width: '35%',
    render: (rowData) => (
      <span data-qa={`private-groups-assessment-name-cell-${rowData?.tableData?.id}`}>{rowData?.assessmentName}</span>
    )
  },
  {
    field: 'lastUpdated',
    title: <span data-qa={'private-groups-last-updated-title'}>Last Updated</span>,
    width: '10%',
    render: (rowData) => (
      <span data-qa={`private-groups-last-updated-cell-${rowData?.tableData?.id}`}>{rowData?.lastUpdated}</span>
    ),
    customSort: (a, b) => (dayjs(a?.lastUpdatedFullDate).isBefore(b?.lastUpdatedFullDate) ? -1 : 1)
  },
  {
    field: 'groupIsShared',
    title: (
      <div style={{ textAlign: 'center !important' }} data-qa={'private-groups-access-title'}>
        Access
      </div>
    ),
    width: '10%',
    headerStyle: {
      textAlign: 'center'
    },
    sorting: false,
    render: (rowData) => (
      <div style={{ textAlign: 'center' }} data-qa={`private-groups-access-cell-${rowData?.tableData?.id}`}>
        <Tooltip
          title={
            rowData?.groupIsShared ? (
              <FormattedMessage id='groups.private.access.shared' defaultMessage='Group has been shared.' />
            ) : (
              <FormattedMessage id='groups.private.access.private' defaultMessage='Group visible only to you.' />
            )
          }
          childrenDisplayStyle='inline'
        >
          <FontAwesomeIcon icon={rowData?.groupIsShared ? faLockOpen : faLockAlt} />
        </Tooltip>
      </div>
    )
  },
  {
    title: '',
    width: '10%',
    sorting: false,
    render: (rowData) => <ViewGroupButton onclick={() => viewGroup(rowData?.id)} />
  }
];

const PrivateGroups = ({ customTheme, tableRef, ...rest }) => {
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [showToolbar, setShowToolbar] = useState(tableRef?.current?.dataManager?.selectedCount > 1);
  if (history.location.pathname != `${INTERNAL_ROUTES.GROUPS}/${GROUP_TABS.PRIVATE_GROUPS.tabIndex}`)
    history.replace(`${INTERNAL_ROUTES.GROUPS}/${GROUP_TABS.PRIVATE_GROUPS.tabIndex}`);

const PrivateGroups = ({ customTheme, tableRef, ...rest }) => {
  const theme = useTheme();
  const emptyMsg1 = useFormatMessage('groups.group.not.created.1', 'No Groups have been created.');
  const emptyMsg2 = useFormatMessage('groups.group.not.created.2', 'To get started, click "Create Group"');

  const PaddedCard = styled(Card)({
    padding: '1.5rem',
    '@media(max-width: 600px)': {
      padding: '1rem'
    }
  });

  const PrivateTableContainer = styled(CardContent)({
    padding: '16px 0px',
    '@media(max-width: 800px)': {
      padding: '0.5rem 0',
      overflow: 'none',
      overflowX: 'auto',
      whitespace: 'nowrap'
    }
  });

  const PrivateGroupTable = () => {
    return (
      <PaddedCard {...rest}>
        <ThemeProvider theme={customTheme}>
          <MaterialTable
            tableRef={tableRef}
            data-qa={'private-groups-table'}
            style={{ width: '100%' }}
            title={<PrivateTableTitle />}
            columns={columns}
            isLoading={loadingGroups}
            options={{
              actionsColumnIndex: -1,
              sorting: true,
              search: false,
              paging: true,
              initialPage: 0,
              pageSize: 5,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [5, 10, 50, 100, 500],
              selection: true,
              showTitle: true,
              selectionProps: (rowData) => ({
                color: 'primary',
                'data-qa': `private-groups-checkbox-${rowData.tableData.id}`
              }),
              headerSelectionProps: {
                'data-qa': 'private-groups-header-select-all-checkbox'
              },
              headerStyle: {
                backgroundColor: theme.palette.primary[20],
                whiteSpace: 'nowrap',
                fontWeight: '700',
                position: 'sticky',
                fontSize: '16px',
                color: 'primary'
              },
              rowStyle: (rowData) => ({
                backgroundColor: rowData.tableData.checked ? theme.palette.primary[10] : ''
              })
            }}
            data={(query) => {
              return new Promise((resolve, reject) => {
                const { orderBy, orderDirection, page, pageSize } = query;
                const orderByField = orderBy?.field ? orderBy?.field : 'groupName';
                const orderByDirection = orderDirection ? orderDirection : 'asc';
                fetchUserGroupsPagination(orderByField, orderByDirection, pageSize, page + 1)
                  .then((result) => {
                    const { groupsList, total } = result;
                    resolve({
                      data: groupsList,
                      page: page,
                      totalCount: total
                    });
                  })
                  .then(() => {
                    setLoadingGroups(false);
                  });
              });
            }}
            actions={[
              {
                position: 'toolbarOnSelect'
              }
            ]}
            components={{
              Pagination: (props) => (
                <PaginationContainer>
                  <TablePagination {...props} />
                </PaginationContainer>
              ),
              Container: (props) => <Card css={{ padding: '1.5rem' }} {...props} variant='outlined' />,
              Action: (props) => <CompareGroupsButton data={props.data} />,
              Toolbar: (props) => {
                const newProps = { ...props, ...{ selectedRows: [] } };
                const showToolbar = props?.selectedRows.length > 1;
                return <MTableToolbar {...(showToolbar ? props : newProps)} />;
              }
            }}
            localization={{
              body: {
                emptyDataSourceMessage: !loadingGroups && !tableRef?.current?.dataManager?.data?.length && (
                  <EmptyGroupTable msg1={emptyMsg1} msg2={emptyMsg2} />
                )
              }
            }}
            onSelectionChange={(rows, rowData) => {
              console.log(rows);
              console.log(rowData);
              console.log(tableRef.current);
              handleSelectionChange(rows);
            }}
            // onChangeRowsPerPage={pageSize => {
            //     setQueryDB(true)
            //     tableRef.current.onQueryChange()
            // }}
            // onChangePage={(page, pageSize)=>{
            //     setQueryDB(true)
            //     tableRef.current.onQueryChange()
            // } }
          />
        </ThemeProvider>
      </PaddedCard>
    );
  };
  return (
    <PrivateTableContainer data-qa={'private-table-container'} className={'mt-table-container'}>
      <PrivateGroupTable />
    </PrivateTableContainer>
  );
};

export default PrivateGroups;
