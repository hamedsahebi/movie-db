// import { join } from 'lodash';
import React, { Component } from 'react';
// import Input from './common/input';
import  Joi  from 'joi-browser'
import Form from './common/Form';
import * as userService from '../services/userService'
import auth from '../services/authService'


class RegisterForms extends Form {

    state = {

        // The initial value of a controled value should not be null or undefined. Because of that we use ""

        data: {username:"", password:"",email:""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("User name"),
        password: Joi.string().required().min(5).label("Password"),
        email: Joi.string().email().required().label("Email")
    };

    
    doSubmit= async() =>{

        try{

            const response = await userService.register(this.state.data);

            auth.loginWithJwt(response);

            window.location = '/';

        }catch(ex){

            if(ex.response && ex.response.status === 400){

                const errors = {...this.state.errors};

                errors['email'] = ex.response.data;

                this.setState({errors});
            }
              
        }

    }

  

    render(){ 


        // const {data,errors} = this.state;
        
        return <div className='container'>

            <h1>Register</h1>

            <form onSubmit={this.handleSubmit}> 

                 {this.renderInput('email','Email','email')}
                
                 {this.renderInput('username','Username')}

                 {this.renderInput('password','Password','password')}

                 {this.submitBtn('Register')}


            </form>

        </div>;
    }


}
 
export default RegisterForms ;