import React, { Component } from 'react';
import propTypes from 'prop-types';


class ListGroup extends React.Component {

    render() { 



        const {genres,currentGenre,textProperty,valueProperty} = this.props;


        return (

            <ul className="list-group">
            {
                genres.map(genre =>{

                    return   (<li key={genre[textProperty]} 
                               className={currentGenre === genre? "list-group-item active":"list-group-item"} 
                               onClick={() => this.props.onGenreChange(genre)}>

                        {genre[valueProperty]}
                        
                        </li>);
                })}

           </ul>

        );
    }
}


ListGroup.propTypes = {

    genres:propTypes.array.isRequired,

    textProperty:propTypes.string.isRequired,

    valueProperty:propTypes.string.isRequired

}

ListGroup.defaultProps = {

    textProperty:"_id",
    valueProperty:"name"
}

 
export default ListGroup;