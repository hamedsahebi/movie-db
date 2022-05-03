import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


const NavBar = ({user}) =>{


    
    return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <NavLink className='navbar-brand' to="/movies">Movie DB</NavLink>

        <div className="collapse navbar-collapse">
            <ul className='navbar-nav'>

                <li><NavLink className='nav-item nav-link' to="/movies">Movies</NavLink></li>
                {/* <li><NavLink className='nav-item nav-link' to="/customers">Customers</NavLink></li>
                <li><NavLink className='nav-item nav-link' to="/rentals">Rentals</NavLink></li> */}

                {!user && (
                    <React.Fragment>
                <li><NavLink className='nav-item nav-link' to="/login">Login</NavLink></li>
                <li><NavLink className='nav-item nav-link' to="/register">Register</NavLink></li>
                </React.Fragment>
                )
                }

                {user && (
                    <React.Fragment>
                    <li><NavLink className='nav-item nav-link' to="/profile">{user.name}</NavLink></li>
                    <li><NavLink className='nav-item nav-link' to="/logout">Log out</NavLink></li>
                    </React.Fragment>

                )

                }
                
            </ul>

        </div>


        </nav>
    );
}

export default NavBar;