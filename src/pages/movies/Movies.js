import React, {useEffect, useState} from 'react';
import Movie from "../../components/movie/Movie";
import axios from "axios";


function Movies() {
    const [movieData, setMovieData] = useState(null);
    const [loading,setLoading]=useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchMovies() {
            try {
                const result = await axios.get('http://localhost:8080/movies',
                    {
                        headers:{
                            "Content-Type":"application/json",
                        }
                    });
                setMovieData(result.data);
            } catch (error) {
                console.error();
            }
        }
        setLoading(false);
        fetchMovies();

    }, [])


    return (
        <>

            {loading &&
            <span className="loading">loading...</span> }

            {!loading && movieData &&
            <div className="position-cont-row">

            {movieData.map((movie) => {
                return <Movie
                key={movie.id}
                movieId={movie.id}
                movieTitle={movie.movieTitle}
                movieImage={movie.image}
                movieRating={movie.movieRating}
                />
            })}

            </div>}

        </>)}

export default Movies;