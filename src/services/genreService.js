
import http from "./http";
import config from '../config.json'




const apiEndpoint = "/genres";


export function getGenres(){

    const Promise = http.get(apiEndpoint);

    return Promise;


}


