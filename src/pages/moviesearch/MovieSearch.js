import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import Movie from "../../components/movie/Movie";

function MovieSearch() {
    const {state}=useLocation();
    const [loading, toggleLoading]=useState(false);
    const[movieData,setMovieData]=useState([]);

    useEffect(() => {
        toggleLoading(true);
        async function fetchMovies() {
            try {
                const result = await axios.get('http://localhost:8080/movies',
                    {
                        headers:{
                            "Content-Type":"application/json",
                        }
                    });
                setMovieData(result.data)
            } catch (e) {
                console.error('no moviedata fetched',e);
            }
        }
        toggleLoading(false)
        fetchMovies()
    }, [state])


    return (
        <>
            {loading &&
            <span
                className="loading">loading...
            </span> }

            {!loading && movieData &&
            <div className="position-cont-row">

                {movieData.map((movie) => {
                    if((movie.movieTitle).toLowerCase().includes((state.search).toLowerCase())) {
                        return <Movie
                            key={movie.id}
                            movieId={movie.id}
                            movieTitle={movie.movieTitle}
                            movieImage={movie.image}
                            movieRating={movie.movieRating}
                        />
                    }})}

            </div>}

        </>)}

export default MovieSearch;