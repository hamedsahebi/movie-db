import http from "./http";
// import config from '../config.json';
import jwtDecode from 'jwt-decode';



// const apiEndpoint = config.apiUrl + "/auth ";
const apiEndpoint = "/auth ";
const tokenKey = 'token';

http.setJwt(getJwt());


export async function login(email,password){
    const {data:jwt} = await http.post(apiEndpoint, {email,password});
    localStorage.setItem(tokenKey,jwt);
}


export function logout(){

    localStorage.removeItem(tokenKey);
}


export async function loginWithJwt(response){

    localStorage.setItem(tokenKey,response.headers['x-auth-token']);
}


export function getUser(){

    try{

        const jwt = localStorage.getItem(tokenKey);
        const user = jwtDecode(jwt);
        return user;

    }catch(ex){

        return null;
    }
      
          
      
}

export function getJwt(){

    return localStorage.getItem(tokenKey);
}

export default{
    login,
    logout,
    loginWithJwt,
    getUser,
    getJwt
}