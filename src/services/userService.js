import http from "./http";
import config from '../config.json';



const apiEndpoint = "/users ";

export function register(user){

    const Promise = http.post(apiEndpoint,{
        email:user.email,
        password: user.password,
        name: user.username
    });

    return Promise;
}