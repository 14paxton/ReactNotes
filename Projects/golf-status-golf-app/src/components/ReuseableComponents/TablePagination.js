import React from 'react';
import {withStyles, useTheme} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';
import {IconButton} from '@material-ui/core';
import {styled} from '@material-ui/core'
import tableIcons from "../Util/getTableIcons";

const BootstrapInput = withStyles((theme) => ({
    root:  {
        'label + &': {
            marginTop: theme.spacing(3)
        }
    },
    input: {
        borderRadius:    4,
        position:        'relative',
        backgroundColor: theme.palette.background.paper,
        border:          '1px solid #ced4da',
        fontSize:        16,
        width:           'auto',
        padding:         '10px 26px 10px 12px',
        transition:      theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus':       {
            borderRadius: 4,
            borderColor:  '#80bdff',
            boxShadow:    '0 0 0 0.2rem rgba(0,123,255,.25)'
        }
    }
}))(InputBase);

const ArrowContainer = styled(Grid)({
    marginTop: 10
});

const PageOfPagesLabel = styled(Grid)({
    marginLeft: 10
});

const StyledNativeSelect = styled(NativeSelect)({
    backgroundColor: '#fff',
    borderRadius:    4
});

const TablePagination = ({
    onChangePage,
    onChangeRowsPerPage,
    count,
    page,
    rowsPerPage,
    rowsPerPageOptions,
    showPagingDropdown
}) => {
    const theme = useTheme();
    rowsPerPageOptions = rowsPerPageOptions || [5, 10, 50, 100];
    showPagingDropdown = (showPagingDropdown === null || showPagingDropdown === undefined)
                         ? true
                         : showPagingDropdown
    return (
        <Grid container>
            <ArrowContainer item container alignItems='center' justify='flex-start' xs={9}>
                <IconButton
                    color={'primary'}
                    data-qa='pagination-previous-page'
                    onClick={() => onChangePage(null, --page)}
                    disabled={page === 0}
                    aria-label='Previous Page'
                    size='medium'
                >
                    <tableIcons.PreviousPage/>
                </IconButton>
                &nbsp;
                <IconButton
                    color={"primary"}
                    data-qa='pagination-next-page'
                    onClick={() => onChangePage(null, ++page)}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    size='medium'
                >
                    <tableIcons.NextPage/>
                </IconButton>
                <PageOfPagesLabel item data-qa='admin-client-page-label'>
                    Page {page + 1} of {Math.ceil(count / rowsPerPage)}
                </PageOfPagesLabel>
            </ArrowContainer>
            <Grid item container alignItems='center' justify='flex-end' xs={3}>
                <Grid item>
                    {showPagingDropdown && (
                        <StyledNativeSelect
                            value={rowsPerPage}
                            input={<BootstrapInput/>}
                            inputProps={{
                                'data-qa':    'pagination-rows-per-page',
                                'aria-label': 'Pagination rows per page'
                            }}
                            onChange={(event) =>
                                onChangeRowsPerPage({
                                    target: {value: parseInt(event.target.value)}
                                })
                            }
                        >
                            {rowsPerPageOptions &&
                             rowsPerPageOptions.map((option, i) => {
                                 return (
                                     <option key={i} value={option}>
                                         {option}
                                     </option>
                                 );
                             })}
                        </StyledNativeSelect>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TablePagination;
