import React, { Component } from 'react';
import  Joi  from 'joi-browser'
import Form from '../common/Form';
import * as movieService from '../../services/movieService'
import * as genreService from  '../../services/genreService'
// import InputSelect from '../common/inputselect';
// import { toast } from 'react-toastify';



class movieForm extends Form {

    

    state = {

        genres: [],

        // The initial value of a controled value should not be null or undefined. Because of that we use ""

        data: {
               _id:"",
               title:"",
               genreId:"", 
               numberInStock:"", 
               dailyRentalRate:""
            },


        errors: {}
    };


    async populateGenres(){
        const {data:genres}= await genreService.getGenres();
        this.setState({genres});
    }

    async populateMovie(){

        try{
            const movie_id = this.props.match.params.movie_id;
            if (movie_id === "new") return;

           const {data:movie} = await movieService.getMovie(movie_id);
           this.setState({data:this.mapToViewModel(movie)});

        }catch(ex){
            if(ex.response && ex.response.status === 404){
                return  this.props.history.replace("/not-found");
            }
        }

    }

    componentDidMount = async()=>{

        this.populateGenres();
        this.populateMovie();   
}

mapToViewModel(movie){
    return{
            _id:movie._id,
            title: movie.title,
            genreId:movie.genreId,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate

    }
}

    schema = {
        _id:Joi.string().allow(''),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().integer().min(0).max(100).required().label("Number In Stock"),
        dailyRentalRate:Joi.number().min(0).max(10).required().label('Rate')
    };

    
    doSubmit= async() => {

        const {data} = this.state;

        await movieService.saveMovie(data);

        this.props.history.push("/movies");

        
    }

    
    render(){

        return (<div className='container'>

            <h1>Movie Form</h1>

            <form onSubmit={this.handleSubmit}> 
                
                {this.renderInput('title','Title')}

                {this.renderSelectInput('genreId','Genre')}

                {this.renderInput('numberInStock','Number in Stock','number')}

                {this.renderInput('dailyRentalRate','Rate','number')}
                
                {this.submitBtn('Save')}

            </form>

        </div>);
    }


}
 



 
export default movieForm;







