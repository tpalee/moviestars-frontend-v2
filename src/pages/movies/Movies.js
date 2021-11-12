import React, {useEffect, useState} from 'react';
import '../movies/Movies.css';
import axios from "axios";
import Movie from "../../components/movie/Movie";


function Movies(props) {
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const result = await axios.get('http://localhost:8080/movies',
                    {
                        headers:{
                            "Content-Type":"application/json",
                        }
                    });
                setMovieData(result.data)




            } catch (error) {
                console.error();
            }
        }

        fetchMovies()
    }, [])


console.log(movieData)

    return (
        <>
            <div className="position-cont-row">
            {movieData && movieData.map((movie) => {

                return <Movie
                key={movie.id}
                movieId={movie.id}
                movieTitle={movie.movieTitle}
                movieImage={movie.image}
                movieRating={movie.movieRating}
                />
            })}
            </div>
        </>);
            }

export default Movies;