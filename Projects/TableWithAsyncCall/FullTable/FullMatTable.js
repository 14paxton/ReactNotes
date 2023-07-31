import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import MaterialTable from 'material-table';
import AssessmentChip from './AssessmentChip';
import { MuiThemeProvider, Paper, styled, Typography, useTheme } from '@material-ui/core';
import { ErrorMessage } from '@hookform/error-message';
import { FormattedMessage } from 'react-intl';
import SelectCounter from './SelectCounter';
import { useFormatMessage } from '../../../i18n/i18n.util';
import CurrentUserContext from '../../../common/context/CurrentUserContext';
import { getFormattedDate } from '../../../common/util/usePreferredDateFormat';
import TablePagination from '../../../common/Table/TablePagination';
import TableSearch from './resultsTableSearch/TableSearch';
import { customSort } from '../../../common/util/appUtils';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { GROUP_RESULT_SELECTION_ACTIONS } from '../helper/groups.helper';
import EllipsisModifier from '../../../common/util/EllipsisModifier';
import Box from '@material-ui/core/Box';
import {useCompareIndividualsModal} from "../../teams/components/compare/modal/CompareIndividualsModalContext";

const ResultsTableContainer = styled(Paper)({
  overflowX: 'auto',
  whitespace: 'nowrap',
  marginRight: 16
});

const ChipsContainer = styled('div')({
  marginTop: 20,
  marginRight: 16
});

const PaginationContainer = styled('div')(({ theme }) => ({
  align: 'center',
  paddingLeft: '10px',
  paddingRight: '15px',
  backgroundColor: `${theme.palette.primary[10]}`
}));

const useStyles = makeStyles((theme) => ({
  largeScreen: {
    width: 1600
  },
  smallScreen: {
    width: '85%'
  }
}));

const defaultSortObject = {
  name: null,
  lastUpdated: null,
  externalPersonId: null,
  receiptId: null,
  assessmentCodeBenchmark: null,
  jobTitle: null,
  id: null
};

const defaultTableLabels = {
  chipsTitle: [
    'groups.create.group.modal.group.members.chips.title',
    'Members in Group'
  ],
  selectCounter: ['groups.create.group.table.select.counter', 'group members']
};

function teamMemberRow(id, tableData){
  return {
    checked: true,
    value: id,
    disabled: true,
    'data-qa': `assessment-results-table-checkbox-${tableData.id}`
  };
}
function thisIsATeamMember(id, teamResultIds){
 return  !!teamResultIds && teamResultIds.length && teamResultIds.includes(id)
}
function resultOptionRow(
  id,
  tableData,
  maxLimitSelected,
  selectedResults,
) {
  const rowSelected = selectedResults?.includes(id);
  const disabled =
    (maxLimitSelected && !rowSelected);
  tableData.disabled = disabled;
  tableData.checked = rowSelected;

  return {
    checked: rowSelected,
    value: id,
    disabled: disabled,
    'data-qa': `assessment-results-table-checkbox-${tableData.id}`
  };
}

const formatRowPerCondition = (
  rowData,
  selectedResults,
  maxLimitSelected,
  currentPagedData,
  teamResultIds
) => {
  const { id, tableData } = rowData;
  const teamId =  thisIsATeamMember(id, teamResultIds)
  return teamId
    ? teamMemberRow(id, tableData)
    : resultOptionRow(
        id,
        tableData,
        maxLimitSelected,
        selectedResults,
        currentPagedData
      );
};

const AssessmentResultsTable = ({
  results,
  selectedResults,
  errors,
  maxGroupMembers,
  selectedIM,
  selectedIMType,
  setResults,
  resultsNameMap,
  loadingData,
  setLoadingData,
  dispatchSelectedResults,
  customTableLabels
}) => {
  const theme = useTheme();
  const tableRef = useRef();
  const classes = useStyles();
  const smallScreen = !useMediaQuery('(min-width:1400px)');
  const [maxLimitSelected, setMaxLimitSelected] = useState(false);
  const [selectAllBoxChecked, setSelectAllBoxChecked] = useState(false);
  const [currentPagedData, setCurrentPagedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(0);
  const [defaultSort, setDefaultSort] = useState(defaultSortObject);
  const { user } = useContext(CurrentUserContext);
  const { REMOVE_ALL, SELECT_ONE, SELECT_ALL } = GROUP_RESULT_SELECTION_ACTIONS;
  const {teamResultIds} = useCompareIndividualsModal()

  const tableLabels = customTableLabels
    ? customTableLabels
    : defaultTableLabels;

  const columnTitles = {
    name: useFormatMessage(
      'groups.create.group.modal.results.table.columns.name',
      'Name / Email'
    ),
    email: useFormatMessage(
      'groups.create.group.modal.results.table.columns.email',
      'Email'
    ),
    lasteUpdated: useFormatMessage(
      'groups.create.group.modal.results.table.columns.lastUpdated',
      'Date Updated'
    ),
    externalPersonId: useFormatMessage(
      'groups.create.group.modal.results.table.columns.externalPersonId',
      'Unique Person ID'
    ),
    receiptId: useFormatMessage(
      'groups.create.group.modal.results.table.columns.receiptId',
      'Receipt ID'
    ),
    codeBenchmark: useFormatMessage(
      'groups.create.group.modal.results.table.columns.codeBenchmark',
      'Job Title'
    ),
    jobTitle: useFormatMessage(
      'groups.create.group.modal.results.table.columns.jobTitle',
      'Job Title'
    )
  };

  const emptyDataSourceMessage = useFormatMessage(
    'groups.create.group.modal.results.table.no.results',
    'No results available to display.'
  );

  useEffect(() => {
    if (results) {
      setLoadingData(false);
    }
  }, [results, setLoadingData]);

  useEffect(() => {
    if (results?.length) {
      const currentData = tableRef.current.dataManager.getRenderState().renderData.map((row) => row.id);
      setCurrentPagedData(currentData);
      const maxLimitReached = selectedResults?.length >= maxGroupMembers;
      const allResultsSelected = currentData.every((row) =>
        selectedResults.includes(row)
      );
      setMaxLimitSelected(maxLimitReached);
      setSelectAllBoxChecked(allResultsSelected);
    } else {
      setSelectAllBoxChecked(false);
    }
  }, [currentPage, currentPageSize, maxGroupMembers, results, selectedResults]);

  const columns = useMemo(() => {
    return [
      {
        field: 'name',
        title: <span data-qa={'assessment-results-table-first-name-column-label'}>{columnTitles?.name}</span>,
        customSort: (a, b) => customSort(a.name, b.name),
        defaultSort: defaultSort.name,
        width: 'auto',
        render: (rowData) => <span data-qa={`assessment-results-table-name-${rowData?.id}`}>{rowData.name}</span>
      },
      {
        field: 'lastUpdated',
        title: <span data-qa={'assessment-results-table-last-updated-column-label'}>{columnTitles.lasteUpdated}</span>,
        defaultSort: defaultSort.lastUpdated,
        render: (rowData) => (
          <Typography noWrap data-qa={`assessment-results-table-last-updated-${rowData?.id}`}>
            {getFormattedDate(user, rowData.lastUpdated)}
          </Typography>
        ),
        width: 'auto'
      },
      {
        field: 'externalPersonId',
        customSort: (a, b) => customSort(a.externalPersonId, b.externalPersonId),
        defaultSort: defaultSort.externalPersonId,
        title: (
          <span data-qa={'assessment-results-table-external-person-id-column-label'}>
            {columnTitles.externalPersonId}
          </span>
        ),
        width: 'auto',
        render: (rowData) => (
          <span data-qa={`assessment-results-table-external-person-id-${rowData?.id}`}>{rowData.externalPersonId}</span>
        )
      },
      {
        field: 'assessmentCodeBenchmark',
        customSort: (a, b) => customSort(a.assessmentCodeBenchmark, b.assessmentCodeBenchmark),
        defaultSort: defaultSort.assessmentCodeBenchmark,
        title: <span data-qa={'assessment-results-table-assessmentCodeBenchmark-label'}
        >{columnTitles.codeBenchmark}</span>,
        render: (rowData) => (<EllipsisModifier maxTextLength={34} textToModify={rowData.assessmentCodeBenchmark} />)
      },
      {
        field: 'jobTitle',
        customSort: (a, b) => customSort(a.jobTitle, b.jobTitle),
        defaultSort: defaultSort.jobTitle,
        title: <span data-qa={'assessment-results-table-job-title-column-label'}>{columnTitles.jobTitle}</span>,
        width: 'auto',
        render: (rowData) => (
          <span data-qa={`assessment-results-table-job-title-${rowData?.id}`}>{rowData.jobTitle}</span>
        )
      },
      {
        field: 'receiptId',
        defaultSort: defaultSort.receiptId,
        title: <span data-qa={'assessment-results-table-receiptId-column-label'}>{columnTitles.receiptId}</span>,
        width: 'auto',
        render: (rowData) => (
          <span data-qa={`assessment-results-table-receipt-id-${rowData?.id}`}>{rowData.receiptId}</span>
        )
      }
    ];
  }, [
    columnTitles.codeBenchmark,
    columnTitles.externalPersonId,
    columnTitles.jobTitle,
    columnTitles.lasteUpdated,
    columnTitles.name,
    columnTitles.receiptId,
    defaultSort.assessmentCodeBenchmark,
    defaultSort.externalPersonId,
    defaultSort.jobTitle,
    defaultSort.lastUpdated,
    defaultSort.name,
    defaultSort.receiptId,
    user
  ]);

  return (
    <>
      <Typography
        key={'teams-table-title'}
        variant="h4"
        data-qa={'results-table-title'}
      >
        <FormattedMessage
          id="groups.create.group.modal.results.table.title"
          defaultMessage="Select Results "
        />
        <span style={{ fontWeight: 'normal', opacity: '0.55' }}>
          <em>
            <FormattedMessage
              id="groups.create.group.modal.results.table.title.max.members"
              defaultMessage="(max of {maxGroupMembers})"
              values={{ maxGroupMembers: maxGroupMembers }}
            />
          </em>
        </span>
      </Typography>
      <ErrorMessage
        errors={errors}
        name="assessmentOrderIds"
        render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
      />
      <br />
      <Grid container className={smallScreen ? classes.smallScreen : classes.largeScreen}>
        <Box clone order={{ xs: 2, s: 2, md: 1 }}>
          <Grid item xs={12} md={7} lg={9}>
            <ResultsTableContainer data-qa={'assessment-results-table'}>
              <MuiThemeProvider theme={theme}>
                <MaterialTable
                  columns={columns}
                  tableRef={tableRef}
                  data={results ?? []}
                  style={{ width: '100%' }}
                  isLoading={loadingData}
                  options={{
                    showTitle: false,
                    toolbar: false,
                    selection: true,
                    showSelectAllCheckbox: true,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [5, 10, 50, 100, 500],
                    headerSelectionProps: {
                      'data-qa': 'assessment-results-table-header-select-all-checkbox',
                      indeterminate:
                        !selectAllBoxChecked && currentPagedData.some((row) => selectedResults.includes(row)),
                      checked:
                        selectAllBoxChecked ||
                        (maxLimitSelected && currentPagedData.some((row) => selectedResults.includes(row))),
                      disabled:
                        !results?.length ||
                        (maxLimitSelected && !currentPagedData.some((row) => selectedResults.includes(row)))
                    },
                    selectionProps: (rowData) => {
                      return formatRowPerCondition( rowData, selectedResults, maxLimitSelected,  currentPagedData, teamResultIds)
                    },
                    rowStyle: rowData =>{
                      const teamMemberRow = thisIsATeamMember(rowData.id, teamResultIds)
                      return teamMemberRow ? {background: '#8CD6D7'} : {}
                    },
                    headerStyle: {
                      sorting: true,
                      fontWeight: 'bold',
                      backgroundColor: `${theme.palette.primary[10]}`,
                      border: '#B1BDDD',
                      fontSize: '16px'
                    }
                  }}
                  localization={{
                    body: {
                      emptyDataSourceMessage: emptyDataSourceMessage
                    }
                  }}
                  components={{
                    Pagination: (props) => (
                      <PaginationContainer>
                        <TablePagination {...props} />
                      </PaginationContainer>
                    )
                  }}
                  onChangeRowsPerPage={(pageSize) => {
                    setCurrentPageSize(pageSize);
                  }}
                  onChangePage={(page, pageSize) => {
                    setCurrentPage(page);
                  }}
                  onOrderChange={(orderBy, orderDirection) => {
                    if (orderBy >= 0) {
                      let newDefaultValues = { ...defaultSortObject };
                      const column = tableRef.current.dataManager.columns[orderBy].field;
                      newDefaultValues[column] = orderDirection;
                      setDefaultSort(newDefaultValues);
                    } else {
                      setDefaultSort(defaultSortObject);
                    }
                  }}
                  onSelectionChange={(rows, rowData) => {
                    if (rowData) {
                      dispatchSelectedResults({
                        type: SELECT_ONE,
                        payload: rowData?.id
                      });
                    } else {
                      if (selectAllBoxChecked || maxLimitSelected) {
                        dispatchSelectedResults({
                          type: REMOVE_ALL,
                          payload: currentPagedData
                        });
                      } else {
                        dispatchSelectedResults({
                          type: SELECT_ALL,
                          payload: tableRef.current.dataManager.getRenderState().renderData
                        });
                      }
                    }
                  }}
                />
              </MuiThemeProvider>
            </ResultsTableContainer>
            <ChipsContainer>
              <Typography key={'group-members-chips-title'} variant="h4" data-qa={'group-members-title'}>
                <FormattedMessage id={tableLabels.chipsTitle[0]} defaultMessage={tableLabels.chipsTitle[1]} />
              </Typography>
              <AssessmentChip
                handleAssessmentSelection={dispatchSelectedResults}
                resultsNameMap={resultsNameMap}
                selectedResults={selectedResults}
              />
              <br />
              <SelectCounter
                total={selectedResults.length}
                max={maxGroupMembers}
                itemsCounted={useFormatMessage(tableLabels.selectCounter[0], tableLabels.selectCounter[1])}
              />
            </ChipsContainer>
          </Grid>
        </Box>
        <Box clone order={{ xs: 1, s: 1, md: 2 }}>
          <Grid item xs={12} md={5} lg={3}>
            <TableSearch selectedIM={selectedIM} selectedIMType={selectedIMType} setResults={setResults} />
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default AssessmentResultsTable;
