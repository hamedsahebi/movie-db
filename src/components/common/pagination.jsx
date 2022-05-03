import React, { Component } from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';


class Pagination extends React.Component {

    render() { 

        const {itemsCount, pageSize,currentPage, onPageChange} = this.props;

        const pageCount = Math.ceil(itemsCount/pageSize);
        const pages = _.range(1,pageCount+1);

        if (pageCount <= 1) return null;

        return (

            <nav aria-label="Page navigation example" style={{marginLeft:'40%', marginTop:'2%'}} >
                <ul className="pagination">
                    {
                    
                    pages.map(page =>{

                       return(<li className={page === currentPage? "page-item active":"page-item"} 
                               key={page} ><a className="page-link" 
                               onClick={() => onPageChange(page)} >{page}</a></li>);

                    })}
                    
                </ul>
            </nav>
        );
    }
}



Pagination.propTypes = {

    itemsCount: propTypes.number.isRequired,
    pageSize: propTypes.number.isRequired,
    currentPage: propTypes.number.isRequired,
    onPageChange: propTypes.func.isRequired,
};
 
export default Pagination;