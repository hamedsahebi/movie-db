import React, { Component } from 'react';
import * as movieService from '../services/movieService'
import * as genreService from '../services/genreService'
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listgroup';
import MoviesTable from './moviesTable';
import _ from 'lodash'
import {NavLink} from 'react-router-dom';
import SearchBox from './common/searchbox';
import { toast } from 'react-toastify';





class Movies extends Component {

    state = {

    moviesList: [],

    pageSize:3,

    currentPage:1,

    genres: [],

    currentGenre:null,

    sortColumn:{path:'title', order:"asc"},
    
    searchQuery:""

    }

    async componentDidMount(){

        const {data:moviesList} = await movieService.getMovies();

        const {data:genreData} = await genreService.getGenres();

        const genres = [{_id:"", name:"All Genres"},...genreData];

        this.setState({genres,moviesList});

    }


    handleDelete = async (movie_id) =>{

        const originalMovies = this.state.moviesList;

        const movies = originalMovies.filter(m => m._id !== movie_id);

        this.setState({moviesList:movies});

        try{

            await movieService.deleteMovie(movie_id);

        }catch(ex){

            if(ex.response && ex.response.status === 404){

                toast("The movie already deleted!");

            }

            this.setState({moviesList:originalMovies});


        }


  
    }

    handleLike = (movie) =>{

        const  movies = [...this.state.moviesList];


        const index = movies.indexOf(movie);
        
        movies[index] = {...movie};
        
        movies[index].liked = movies[index].liked? false:true;

        this.setState({moviesList:movies});

    }

    handlePage = (page) =>{

        this.setState({currentPage:page});

    }


    handleGenre = (genre) =>{

        this.setState({currentGenre:genre,searchQuery:"", currentPage:1});

    }

    handleSort = (sortColumn) =>{

        this.setState({sortColumn});
     
}

    getPageData = () => {

        const {pageSize, 
            currentPage, 
            moviesList:allMovies, 
            currentGenre,
            sortColumn,
            searchQuery} = this.state;

        let  filtered = allMovies;

        if(searchQuery){

            filtered =  allMovies.filter(m => 
                m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()));

            }else if(currentGenre && currentGenre._id){
                
            filtered = allMovies.filter(m => m.genre._id === currentGenre._id)

            }
       

        const sorted = (sortColumn.order === 'asc')? _.sortBy(filtered,[sortColumn.path]):
                                                     _.sortBy(filtered,[sortColumn.path]).reverse();

        const movies = paginate(sorted, currentPage,pageSize);

        return {data:movies, totalNumber:filtered.length};


    }

    handleSearch = (query)=>{

        this.setState({searchQuery:query, selectedGenre:null, currentPage:1})

    }



    render() {

        const {pageSize, 
              currentPage, 
              genres,
              currentGenre,
              sortColumn,
              searchQuery,
              } = this.state;

        const user = this.props.user;      
              


        const result = this.getPageData();


        return(

            <React.Fragment>

                <div>
                    <div className='row'> 

                        <div className='col-2'>

                        <ListGroup genres = {genres}
                            currentGenre = {currentGenre}
                            onGenreChange = {this.handleGenre}
                                    />
                                    
                        </div>

                        <div className='col'>

                        {user && <NavLink 
                        className="btn btn-primary" 
                        style={{marginBottom:5}} to="movies/new">
                        New Movie
                        </NavLink>}

                        

                        <p>Showing {result.totalNumber} movies in the database.</p>

                        <SearchBox value={searchQuery} onChange={this.handleSearch}/>


                        <MoviesTable movies={result.data}
                            sortColumn = {sortColumn}
                            onLike = {this.handleLike}
                            onDelete = {this.handleDelete}
                            onSort = {this.handleSort}/>
                    

                        <Pagination itemsCount={result.totalNumber}
                            pageSize = {pageSize}
                            onPageChange = {this.handlePage}
                            currentPage = {currentPage}/>

                        

                        </div>
                    </div>
                </div>

                

            </React.Fragment>
        ); 
    }

}



export default Movies;




