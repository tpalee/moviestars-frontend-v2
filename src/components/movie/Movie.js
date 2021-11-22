import React, {useEffect, useState} from 'react';
import './Movie.css'
import {Link} from 'react-router-dom';
import axios from "axios";
import defaultImage from '../../assets/img/defaultmovie.jpg'
import ShadowContainer from "../shadowcontainer/ShadowContainer";
import {RiStarFill} from 'react-icons/ri';

function Movie({movieTitle, movieRating, movieImage, movieId}) {
    const [urlContent, setUrlContent] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        if (movieImage) {
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

            getPictureContent();
        }
    }, [movieImage])

    let stars=[];
    const starRate=function(average){

        const rating=Math.round(average/2);
        for (let i = 0; i < rating; i++) {
            stars.push("orangestar")
        }
        for (let j = 0; j < 5-rating; j++) {
            stars.push("greystar")
        }
        return stars;
    }
starRate(movieRating)
    return (
        <>
            {loading && <span>loading...</span>}
            {error && <span>something went wrong, data not loaded</span>}
            {!loading &&
            <Link className="movielink" key={movieId} to={{pathname:`/movies/${movieId}`,state:{urlContent}}}>
                <ShadowContainer className="movie-cont">
                    {movieImage == null ?
                        <img className="movieimage" src={defaultImage} alt="movieimage"/> :
                        <img className="movieimage" alt="movieimage" src={urlContent}/>
                    }

                    <h4 className="movie-h4">{movieTitle}</h4>
                    <div className="stars">
                    {stars && stars.map((star,index)=>{
                       return( (star==='orangestar')?
                            <RiStarFill key={index} className="orangestar"/>:
                            <RiStarFill key={index} className="greystar"/>)}
                    )}
                    </div>

                </ShadowContainer>
            </Link>}
        </>
    );
}

export default Movie;