import React, {useEffect, useState} from 'react';
import'./Movie.css'
import {Link} from 'react-router-dom';
import axios from "axios";
import defaultImage from '../../assets/img/defaultmovie.jpg'

function Movie({movieTitle, movieRating, movieImage, movieId}) {
    const [urlContent, setUrlContent] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(()=> {
        if(movieImage){
    async function getPictureContent() {
        toggleError(false)
        toggleLoading(true)
        try {
            const pictureResult = await axios.get(`http://localhost:8080/images/${movieImage.id}`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    responseType: "blob",
                });
            setUrlContent(pictureResult.config.url)
        } catch (error) {
            console.error(error);
            toggleError(true)
        }
        toggleLoading(false)
    }
    getPictureContent();}
},[movieImage])



    return (
        <>            {loading && <span>loading</span>}
            {error && <span>something went wrong, data not loaded</span>}
        <Link className="movielink" key={movieId} to={'/movies/'+ movieId}>
            {loading && <span>loading...</span>}
            {error && <span>Something went wrong, no data fetched...</span>}
        <article className="moviecontainer" >
            {movieImage==null ?
                <img className="movieImage" src={defaultImage} alt="movieimage"/>:
                <img alt="tessie" src={urlContent} />
            }

            <h2>{movieTitle}</h2>
            <p>rating:{movieRating}</p>
        </article>
        </Link>
        </>
    );
}

export default Movie;