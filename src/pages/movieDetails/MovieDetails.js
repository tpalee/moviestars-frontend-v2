import React, {useEffect, useState, useContext} from 'react';
import {useParams, useHistory, useLocation} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import axios from "axios";
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import Review from "../../components/review/Review";
import Button from "../../components/buttons/Button";
import AddReviewButton from "../../components/buttons/AddReviewButton";
import BackButton from "../../components/buttons/BackButton";
import './MovieDetails.css';
import {MdSystemUpdateAlt} from 'react-icons/md';
import defaultImage from "../../assets/img/defaultmovie.jpg";


function MovieDetails() {
    const [movie, setMovie] = useState([]);
    const [review, setReview] = useState([]);
    const {movieId} = useParams();
    const history = useHistory();
    const {user} = useContext(AuthContext);
    const {state} = useLocation();
    const [loading, toggleLoading] = useState(false)


    useEffect(() => {
        const abortCont = new AbortController();

        async function fetchMovieData() {
            toggleLoading(true);
            try {
                const result = await axios.get(`http://localhost:8080/movies/${movieId}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    signal: abortCont.signal,
                })
                setMovie(result.data)
            } catch (e) {
                if (e.name === 'AbortError') {
                    console.log("fetchData aborted")
                }
                console.error("no moviedata fetched", e);
            }
        }

        fetchMovieData()
        toggleLoading(false);
        return () => {
            abortCont.abort()
        }
    }, [])


    useEffect(() => {
        const abortCont = new AbortController();

        async function fetchReviewData() {
            toggleLoading(true);
            try {
                const result = await axios.get(`http://localhost:8080/movies/${movieId}/reviews`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    signal: abortCont.signal,
                })
                setReview(result.data)
            } catch (e) {
                if (e.name === 'AbbortError') {
                    console.log("fetchData aborted")
                }
                console.error("no reviewdata fetched", e);
            }
        }
        fetchReviewData()
        toggleLoading(false);
        return () => {
            abortCont.abort()
        }
    }, [])


    return (
        <section className="position-cont-col">
            {loading && <span className="loading">loading...</span>}
            {!loading && movie &&
            <>
                <ShadowContainer className="moviedetails-cont">

                    {/*check if stateobject has the url of the movie-image, if not place defaultimage*/}
                    {(Object.entries(state.urlContent).length === 0) ?
                        <img
                            className="moviedetails-image"
                            src={defaultImage}
                            alt="movieimage"
                        /> :

                        <img
                            className="moviedetails-image"
                            src={state.urlContent}
                            alt="movieimage"
                        />
                    }

                    <div className="moviedetails-info">
                        <h1 className="moviedetails-h1">
                            {movie.movieTitle}
                        </h1>

                        <p className="moviedetail-genre">
                            genre: {movie.movieGenre}
                        </p>

                        <p className="moviedetails-description">
                            {movie.movieDescription}
                        </p>

                        <p className="moviedetails-rating">
                            rating:
                            <span className="moviedetails-spanrating">{movie.movieRating}</span>
                        </p>

                        <small
                            className="moviedetails-small">
                            posted by: {movie.moviePoster}
                        </small>

                        <div className="moviedetails-btn-cont">
                            <BackButton
                                handleClick={() => {
                                    history.goBack()
                                }}
                            />

                            {user &&
                            <AddReviewButton
                                name="Add Review"
                                handleClick={() => {
                                    history.push('/addreview', movieId)
                                }}
                            />}

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

                <section>

                    {(review.length !== 0) &&
                    <ShadowContainer className="orange-cont">

                        <h1
                            className="moviedetails-reviews-title">REVIEWS
                        </h1>

                    </ShadowContainer>}

                    {review && review.map((review) => {
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
                    })}

                </section>
            </>

            }
        </section>
    );
}

export default MovieDetails;