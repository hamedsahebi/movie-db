import React, { Component } from 'react';
import  Joi  from 'joi-browser';
import Input from './input';
import InputSelect from './inputselect';

class Form extends React.Component {

    state = {
        data:{},
        errors:{},
        genres:[],
    }
    
    
    validate = ()=>{


        const {data} = this.state;

        const result = Joi.validate(data,this.schema, {abortEarly: false});

        const {error} = result;

        if (!error) return null;

        const errors = {}

        for (let item of error.details ){
            
             errors[item.path[0]] = item.message;
        }

        return errors;
        
    }

    handleSubmit = e =>{

        e.preventDefault();

         const errors = this.validate();

         this.setState({errors: errors || {}});
        
         if (errors) return;

         this.doSubmit();

    
    }

   validateProperty = ({name,value})=>{

        

    const obj = {[name]:value};
    const schema = {[name]:this.schema[name]};
    const result = Joi.validate(obj,schema);
    const {error} = result;
    return error? error.details[0].message:null;


}

handleChange = ({currentTarget:input}) =>{


    const errorMessage = this.validateProperty(input);
    const errors = {...this.state.errors};

    
    if(errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = {...this.state.data};
    data[input.name] = input.value;
    this.setState({data,errors});
    

}

submitBtn = (label) =>{


    return (                    
    <button disabled={this.validate()} className="btn btn-primary">{label}</button>
    )
}

renderInput = (name,label,type='text')=>{

    const {data,errors} = this.state;

    return(
        <Input
                   type = {type} 
                   value = {data[name]}
                   onChange = {this.handleChange}
                   name = {name}
                   label = {label}
                   error = {errors[name]}/>

          )
}

renderSelectInput = (name,label)=>{

    const {genres,errors} = this.state;

    return(

        <InputSelect label = {label}
                           onChange={this.selectHandle} 
                           name = {name} 
                           genres={genres}
                           error = {errors[name]}/>

        
    )
}

selectHandle = ({currentTarget:input})=>{

    
    const data = {...this.state.data};

    data.genreId = input.value;

    this.setState({data});

}

}
 
export default Form;