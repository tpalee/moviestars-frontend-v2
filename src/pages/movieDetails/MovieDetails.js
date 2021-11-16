import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import axios from "axios";
import './MovieDetails.css'
import {FaPlus} from 'react-icons/fa';
import {MdSystemUpdateAlt} from 'react-icons/md';
import {TiArrowBack} from 'react-icons/ti'
import defaultImage from "../../assets/img/defaultmovie.jpg";
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import Review from "../../components/review/Review";
import Button from "../../components/buttons/Button";


function MovieDetails() {
    const [movie, setMovie] = useState(null);
    const {movieId} = useParams();
    const history = useHistory();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        async function fetchMovieData() {
            try {
                const result = await axios.get(`http://localhost:8080/movies/${movieId}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                setMovie(result.data)
            } catch (error) {
                console.error();
            }
        }
        fetchMovieData()
    }, [movieId])







    return (

        <section className="position-cont-col">
            {movie &&
            <>
                <ShadowContainer className="moviedetails-cont">
                    <img className="moviedetails-image" src={defaultImage}
                         alt="movieimage"/>
                    <div className="moviedetails-info">
                        <h1 className="moviedetails-h1">{movie.movieTitle}</h1>
                        <p className="moviedetails-description">{movie.movieDescription}</p>
                        <p className="moviedetails-rating">rating:
                            <span className="moviedetails-spanrating">{movie.movieRating}</span>
                        </p>
                        <div className="moviedetails-btn-cont">
                            <Button
                                className="orange-btn"
                                type="button"
                                handleClick={() => {history.push('/movies')}}
                            >
                                <TiArrowBack className="icon back"/>
                                <span className="btn-txt back-txt">Back</span>
                            </Button>

                            {user &&
                            <Button
                                className="green-btn"
                                handleClick={() => {
                                    history.push('/addreview', movieId)
                                }}>
                                <FaPlus className="icon plus"/>
                                <span className="btn-txt add-txt">Add Review</span>
                            </Button>}

                            {user !== null && movie.moviePoster === user.username &&
                            <Button
                                className="green-btn"
                                handleClick={() => history.push(`/updatemovie/${movieId}`)}>
                                <MdSystemUpdateAlt className="icon update"/>
                                <span className="btn-txt update-txt">Update Movie</span>
                            </Button>}
                        </div>
                    </div>

                </ShadowContainer>

                <div>
                    {movie.reviews && <ShadowContainer className="orange-cont">
                        <h1 className="moviedetails-reviews-title">REVIEWS</h1>
                    </ShadowContainer>}

                    {movie.reviews && movie.reviews.map((review) => {
                        return (
                            <Review
                                key={review.id}
                                reviewId={review.id}
                                reviewer={review.reviewer}
                                review={review.review}
                                reviewRating={review.reviewRating}
                                badLanguage={review.badLanguage}
                            />
                        )
                    })}</div>

            </>

            }

        </section>

    );


}

export default MovieDetails;