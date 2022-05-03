import React, { Component } from 'react';


const Input = ({name,label,error,...rest})=>{
    // rest includes other properties: value,onChange,type

    return(

        <div className="form-group">
                    <label htmlFor={name}>{label}</label>
                    <input 
                    autoFocus 
                    name={name}
                    id={name}
                    {...rest}
                    // value={value} 
                    // onChange={onChange}
                    // type={type}
                    className="form-control" />
                    {error && <div className="alert alert-danger">{error}</div>}
                    </div>
    );

}

export default Input;