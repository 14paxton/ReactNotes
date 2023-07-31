import async from "async";
import {RUBY_FETCH_MOVIE_LIST} from "../util/urls";
import {fetchData, fetchDataWithParams} from "../util/externalAPIs";

export const fetchMovies = async (orderBy, orderDirection, pageSize, page) => {
    let params = {
        orderBy: orderBy,
        orderDirection: orderDirection,
        pageSize: pageSize,
        page: page
    };

    // const response = await getTestMovies();
    console.log(RUBY_FETCH_MOVIE_LIST)
    console.log(process)
    console.log(process.env)
    console.log(process.env.REACT_APP_APPLICATION_SERVER_URL)
    const response = await fetchData(RUBY_FETCH_MOVIE_LIST);
    // const response = await fetchDataWithParams(RUBY_FETCH_MOVIE_LIST, params);
    return response?.movieList
           ? response
           : { movieList: [],  total: 0 };
};



async function getTestMovies(){
    let newDate = new Date()
   const movieList =  [
        {name : "Jurassic Park", releaseDate : newDate.setMonth(1), rating : 5, runTime: 1.5},
        {name : "Dogma", releaseDate : newDate.setMonth(2), rating : 5, runTime: 1.5},
        {name : "Hackers", releaseDate : newDate.setMonth(3), rating : 5, runTime: 1.5},
        {name : "Gladiator", releaseDate : newDate.setMonth(4), rating : 5, runTime: 1.5},
        {name : "E.T.", releaseDate : newDate.setMonth(5), rating : 5, runTime: 1.5},
        {name : "Evolution", releaseDate : newDate.setMonth(6), rating : 5, runTime: 1.5},
        {name : "Good Boys", releaseDate : newDate.setMonth(7), rating : 5, runTime: 1.5},
        {name : "The Green Mile", releaseDate : newDate.setMonth(8), rating : 5, runTime: 1.5},
    ]

    return { movieList: movieList , total : movieList.length}
}
