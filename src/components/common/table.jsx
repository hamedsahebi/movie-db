import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';


// Stateless function
const Table = ({sortColumn,
    columns,
    movies,
    onSort,
    onLike,
    onDelete}) =>{



    return(

        <table className='table'>

        <TableHeader onSort = {onSort}
                     sortColumn = {sortColumn}
                     columns = {columns}
                      />
         

         <TableBody onLike = {onLike}
                    onDelete = {onDelete}
                    movies = {movies}
                    columns = {columns}
                    />
        
    </table>
    )
}





 
export default Table;
