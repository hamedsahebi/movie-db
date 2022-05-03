import React, { Component } from 'react';



class TableHeader extends React.Component {


    

    raiseSortColumn = (path) =>{

        const sortColumn = {...this.props.sortColumn};

        if (sortColumn.path === path){


            sortColumn.order = (sortColumn.order === "asc")?"desc":"asc";
        
        }else{

            sortColumn.path = path;
            sortColumn.order = 'asc';
               
        }


        this.props.onSort(sortColumn);
    }

    createSortIcon(column){

        const {sortColumn} = this.props;

        if (sortColumn.path !== column.path) return null;

        if(sortColumn.order === 'asc') return (<i className="fa fa-sort-asc" aria-hidden="true"></i>);

        return (<i className="fa fa-sort-desc" aria-hidden="true"></i>);


    }






    render() { 

        const {columns} = this.props

        return (

        <thead>

            <tr>{
                columns.map(column=>{

                    return (<th key={column.path || column.key} 
                        onClick={()=>this.raiseSortColumn(column.path)}>
                            {column.label}{this.createSortIcon(column)}
                            </th>
                    )
                })}
          </tr>
        </thead>
        )
            }
        }




 
export default TableHeader;