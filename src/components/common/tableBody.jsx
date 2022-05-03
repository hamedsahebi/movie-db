import _ from 'lodash';
import React, { Component } from 'react';





class TableBody extends Component {


    renderCell = (movie,column) =>{

        if (column.content) return  column.content(movie);

        return _.get(movie,column.path)
    }

    createKey = (movie,column) =>{

        return movie._id + (column.path||column.key);
    }

    


    render() { 


        const {movies,onLike,onDelete,columns} = this.props;


        return (
        
        <tbody>
            {movies.map((movie) => {

                return (<tr key={movie._id}>

                            {columns.map(column =>{

                                return <td key={this.createKey(movie,column)}>{this.renderCell(movie,column)}</td>


                            } 
                        ) 
                    }
                       </tr>)
                }
            )
        }
                             
        </tbody>)
                             




        
    }
}
 
export default TableBody;

