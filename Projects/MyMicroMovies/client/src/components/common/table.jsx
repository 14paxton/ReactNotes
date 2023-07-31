import React from 'react';
import TableHeader from "./tableHeader";
import TabelBody from "./tabelBody";

const Table = ({columns, sortColumn, onSort, data}) => {
    return (
        <table className="table">
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
            <TabelBody data={data} columns={columns}/>
        </table>
    );
};

export default Table;
