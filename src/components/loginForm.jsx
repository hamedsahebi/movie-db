import { join } from 'lodash';
import React, { Component } from 'react';
import Input from './common/input';
import  Joi  from 'joi-browser'
import Form from './common/Form';
import auth from './../services/authService';
import { Redirect } from 'react-router-dom';


class LoginForms extends Form {

    state = {

        // The initial value of a controled value should not be null or undefined. Because of that we use ""

        data: {email:"", password:""},
        errors: {}
    };

    schema = {
        email: Joi.string().required().label("User name"),
        password: Joi.string().required().label("Password")
    };

    
    doSubmit= async() =>{
        try{

            const {data} = this.state;
            await auth.login(data.email,data.password);

            const {state} = this.props.location;
            window.location = state?state.from.pathname:"/"

        }catch(ex){

            if(ex.response && ex.response.status===400){

                const errors = {...this.state.errors};
                errors['email'] = ex.response.data;
                this.setState({errors});
            }


        }

    }

  

    render(){ 

        if(auth.getUser())  return  <Redirect to="/" />

        return <div className='container'>

            <h1>Login</h1>

            <form onSubmit={this.handleSubmit}> 
                
                 {this.renderInput('email','Username')}

                 {this.renderInput('password','Password','password')}
                
                 {this.submitBtn('Login')}
            </form>

        </div>;
    }


}
 
export default LoginForms;