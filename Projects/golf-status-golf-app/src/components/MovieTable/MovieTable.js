import React, {useEffect, useRef, useState} from 'react';
import MaterialTable from 'material-table';
import {
    Card,
    CardContent,
    styled,
} from '@material-ui/core';
import dayjs from 'dayjs';
import {fetchMovies} from "../../services/movieService";
import getTableIcons from "../Util/getTableIcons";
import EmptyTable from "../ReuseableComponents/EmptyTable";
import TablePagination from "../ReuseableComponents/TablePagination";

const PaginationContainer = styled('div')(({ theme }) => ({
    align: 'center',
    paddingLeft: '10px',
    paddingRight: '15px',
    backgroundColor: `${theme.palette.primary[10]}`
}));

const columns = [
    {
        field:       'name',
        title:       <span data-qa={'private-movies-movie-name-title'}>Movie Name</span>,
        width:       'auto',
        defaultSort: 'asc',
        render:      (rowData) => (
            <span data-qa={`private-movies-movie-name-cell-${rowData?.tableData?.id}`}>{rowData?.name}</span>
        )
    },
    {
        field:      'releaseDate',
        title:      <span data-qa={'private-movies-assessment-name-title'}>Release Date</span>,
        width:      'auto',
        render:     (rowData) => (
            <span data-qa={`private-movies-assessment-name-cell-${rowData?.tableData?.id}`}>{new Date(rowData?.releaseDate).toLocaleDateString()}</span>
        ),
        customSort: (a, b) => (dayjs(a?.releaseDate).isBefore(b?.releaseDate)
                               ? -1
                               : 1)
    },
    {
        field:  'rating',
        title:  <span data-qa={'private-movies-last-updated-title'}>Rating</span>,
        width:  'auto',
        render: (rowData) => (
            <span data-qa={`private-movies-last-updated-cell-${rowData?.tableData?.id}`}>{rowData?.rating}</span>
        )
    },
    {
        field:  'runTime',
        title:  <span data-qa={'private-movies-last-updated-title'}>Run Time</span>,
        width:  'auto',
        render: (rowData) => (
            <span data-qa={`private-movies-last-updated-cell-${rowData?.tableData?.id}`}>{rowData?.runTime}</span>
        )
    }
];

const MovieTable = ({...rest}) => {
    const [loadingMovies, setLoadingMovies] = useState(true)
    const [movieList, setMovieList] = useState()
    const tableRef = useRef();

    useEffect(() => {
        fetchMovies().then(data => {
            const {movieList} = data
            setMovieList(movieList
                         ? movieList
                         : [])

            setLoadingMovies(false)
        })
    }, []);


    const PaddedCard = styled(Card)({
        padding:                    '1.5rem',
        '@media(max-width: 600px)': {
            padding: '1rem'
        }
    });

    const MovieTableContainer = styled(CardContent)({
        padding:                    '16px 0px',
        '@media(max-width: 800px)': {
            padding:    '0.5rem 0',
            overflow:   'none',
            overflowX:  'auto',
            whitespace: 'nowrap',
            display: 'block'
        }
    });

    const MovieTable = () => {
        return (
            <PaddedCard {...rest}>
                <MaterialTable
                    icons={getTableIcons}
                    tableRef={tableRef}
                    data-qa={'movies-table'}
                    style={{width: '100%'}}
                    title={'Ruby Movies'}
                    columns={columns}
                    isLoading={loadingMovies}
                    options={{
                        actionsColumnIndex:   -1,
                        sorting:              true,
                        search:               true,
                        paging:               true,
                        initialPage:          0,
                        pageSize:             5,
                        emptyRowsWhenPaging:  false,
                        pageSizeOptions:      [5, 10, 50, 100, 500],
                        selection:            true,
                        selectionProps:       (rowData) => ({
                            color:     'primary',
                            'data-qa': `movie-table-${rowData.tableData.id}`
                        }),
                        headerSelectionProps: {
                            'data-qa': 'movie-table-select-all-checkbox'
                        },
                        headerStyle:          {
                            backgroundColor: "blue",
                            whiteSpace:      'nowrap',
                            fontWeight:      '700',
                            position:        'sticky',
                            fontSize:        '16px',
                            color:           'primary'
                        },
                        rowStyle:             (rowData) => ({
                            backgroundColor: rowData.tableData.checked
                                             ? "pink"
                                             : ''
                        })
                    }}
                    data={movieList

                        //use for async remote data, will only rerender table rows
                        // (query) => {
                        //     return new Promise((resolve, reject) => {
                        //         const {orderBy, orderDirection, page, pageSize} = query;
                        //         const orderByField = orderBy?.field
                        //                              ? orderBy?.field
                        //                              : 'name';
                        //         const orderByDirection = orderDirection
                        //                                  ? orderDirection
                        //                                  : 'asc';
                        //         fetchMovies(orderByField, orderByDirection, pageSize, page + 1)
                        //             .then((result) => {
                        //                 const {movieList, total} = result;
                        //                 resolve({
                        //                     data:       movieList,
                        //                     page:       page,
                        //                     totalCount: total
                        //                 });
                        //             })
                        //             .then(() => {
                        //                 setLoadingMovies(false);
                        //             });
                        //     });
                        // }
                    }
                    components={{
                        Pagination: (props) => (
                            <PaginationContainer>
                                <TablePagination {...props} />
                            </PaginationContainer>
                        ),
                        Container: (props) => <Card css={{padding: '1.5rem'}} {...props} variant='outlined'/>,
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: !loadingMovies && !tableRef?.current?.dataManager?.data?.length &&
                                                    <EmptyTable msg1={'Empty Table'} msg2={'No Movies Available'}/>
                        }
                    }}
                />
            </PaddedCard>
        );
    };
    return (
        <MovieTableContainer data-qa={'movie-table-container'}>
            <MovieTable/>
        </MovieTableContainer>
    );
};

export default MovieTable;
