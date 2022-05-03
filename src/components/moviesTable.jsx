import React, {Component}  from 'react';
import HeartIcon from './common/heart-icon';
import Table from './common/table';
import TableBody from './common/tableBody';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

 

class MoviesTable extends Component {

    columns = [{path:'title',label:'Title', content:(movie)=> <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
               {path:'genre.name',label:'Genre'},
               {path:'numberInStock',label:'Stock'},
               {path:'dailyRentalRate',label:'Rate'},
               {key:'like',
               content: (movie) => (<HeartIcon  movie = {movie}  likeHandle = {this.props.onLike}></HeartIcon>)},
                ];

                deleteColumn = {key:'delete',
                content: (movie) => <button onClick={() => this.props.onDelete(movie._id)} 
                                            className="btn btn-danger btn-sm" >Delete
                                   </button>}

    constructor(){
        super();
        const user = auth.getUser();
        if(user && user.isAdmin) this.columns.push(this.deleteColumn);
    }

    render() { 

        const {onLike,onDelete,onSort,sortColumn,movies} = this.props;
        return (

            <Table onDelete = {onDelete}
                   onSort = {onSort}
                   onLike = {onLike}
                   movies = {movies}
                   sortColumn = {sortColumn}
                   columns = {this.columns} />
                   
        );
    }
}
 
export default MoviesTable;
