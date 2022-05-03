import React, { Component } from 'react';
import auth from '../../services/authService';
import {Route,Redirect} from 'react-router-dom';



const ProtectedRoute = (props) =>{

    const {path,component:Component,render,...rest} = props;


    return(<Route
         
      
         path={path}
         {...rest}

         render={props => {
          if(!auth.getUser()) return <Redirect to={{
              pathname:"/login",
              state:{from:props.location}
          }} />
           return (Component)?(<Component {...props}/>): render(props)
        }} 
        
        />

    )
}


export default ProtectedRoute;