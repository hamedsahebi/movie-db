
import http from "./http";
import config from '../config.json';



const apiEndpoint = "/movies";

export function getMovies(){

    const Promise = http.get(apiEndpoint);

    return Promise;


}

function movieUrl(id){

    return `${apiEndpoint}/${id}`;
}

export function deleteMovie(movie_id){

    const Promise = http.delete(movieUrl(movie_id));
    return Promise;
}

export function getMovie(movie_id){

    const Promise = http.get(movieUrl(movie_id));
    return Promise;
}

export function saveMovie(movie){

    if(movie._id){

        const body = {...movie};
        delete body._id;
        const Promise = http.put(movieUrl(movie._id),body);
        return Promise;
    }

        const body = {...movie};
        delete body._id;
        const Promise = http.post(apiEndpoint,body);
        return Promise;

}


