import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Movies from './components/movies';
import NavBar from './components/common/navbar';
import NotFound from './components/notFound';
import movieForm from './components/movies/movieform';
import LoginForms from './components/loginForm';
import RegisterForms from './components/registerForm';
import Logout from './components/common/logout';
import ProtectedRoute from './components/common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import auth from './services/authService'
import './App.css';


class App extends Component {

  state = {}


  componentDidMount() {

    const user = auth.getUser();
    this.setState({ user });
     
  }

  render(){

    const {user} = this.state;

    return (
      <div>
      <ToastContainer/>
      <NavBar user = {user} />

      <main style={{marginLeft:'2%'}}>
      
         <Switch >
           
         <ProtectedRoute path="/movies/:movie_id" component={movieForm}/>
         <Route path="/login" component={LoginForms}/>
         <Route path="/logout" component={Logout}/>
         <Route path="/register" component={RegisterForms}/>
         <Route path="/movies" render={props => <Movies {...props} user={this.state.user}/> }/>
         {/* <Route path="/customers" component={Customers}/> */}
         {/* <Route path="/rentals" component={Rentals}/> */}
         <Route path="/not-found" component={NotFound}/>
         <Redirect path="/" exact to="/movies"/>
         <Redirect to="/not-found" />
            
        </Switch>
         

      </main>

      </div>
    )
  }
}

export default App;


