import React, { Component } from 'react';




class HeartIcon extends React.Component {

    render() { 
        
        const {movie} = this.props;

        return <i className={movie.liked? "fa fa-heart":"fa fa-heart-o"} aria-hidden="true" onClick={()=>this.props.likeHandle(movie)}></i>;

    }
}
 
export default HeartIcon;