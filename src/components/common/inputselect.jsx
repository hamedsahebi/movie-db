import React, { Component } from 'react';


const InputSelect = (props)=>{

    const  {name,label,genres,onChange,error} = props;
    return(
        <div className='form-group'>
                 <label htmlFor={name}>{label}</label>
                 <select onChange={onChange} id={name} className="custom-select" aria-label="Default select example">
                    {genres.map(genre =>(
                        <option key = {genre._id} value = {genre._id}>
                        {genre.name}
                        </option> )
                        
                    )}
                    
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
        </div>
    
    )
                    }

export default InputSelect;