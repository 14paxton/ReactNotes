import React from 'react';
import TableHeader from "./tableHeader";
import TabelBody from "./tabelBody";

const Table = () => {
    return (
        <table className="table">
            <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort}/>
            <TabelBody data={movies} columns={this.columns}/>
        </table>
    );
};

export default Table;
