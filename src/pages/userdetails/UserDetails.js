import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Movie from "../../components/movie/Movie";
import Button from "../../components/buttons/Button";
import '../userdetails/UserDetails.css'
import {MdSystemUpdateAlt} from 'react-icons/md';
import DeleteButton from "../../components/buttons/DeleteButton";
import BackButton from "../../components/buttons/BackButton";
import Review from "../../components/review/Review";

function UserDetails(props) {
    const {isAdmin, user} = useContext(AuthContext);
    const {userId} = useParams();
    const history = useHistory();
    const token = localStorage.getItem('token');
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [movieData, setMovieData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [dataChange, setDataChange]=useState(false);

    useEffect(() => {
        toggleLoading(true);
        setDataChange(false);
        async function fetchUserData() {
            try {
                const result = await axios.get(`http://localhost:8080/users/${userId}`, {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserInfo(result.data);
            } catch (e) {
                console.error("no userData fetched" + e)
                toggleError(true);
            }
        }

        fetchUserData()

        async function fetchMovieData() {
            try {
                const result = await axios.get(`http://localhost:8080/users/${userId}/movies`, {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                setMovieData(result.data);

            } catch (e) {
                console.error("no MovieData fetched" + e)
                toggleError(true);
            }
        }

        fetchMovieData()

        async function fetchReviewData() {
            try {
                const result = await axios(`http://localhost:8080/users/${userId}/reviews`, {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                setReviewData(result.data)
            } catch (e) {
                console.error("no ReviewData fetched" + e)
                toggleError(true);
            }
        }

        fetchReviewData()
        toggleLoading(false)
    }, [userId,dataChange])


    async function deleteMovieReview(urltype, id) {
        const token = localStorage.getItem('token');
        let url = "";
        try {
            if (urltype === 'movie') {
                url = `http://localhost:8080/movies/${id}`
            } else {
                url = `http://localhost:8080/reviews/${id}`
            }
            await axios.delete(url, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (e) {
            console.error("sorry, can't delete", e)
        }
        setDataChange(true);
    }


    return (
        <>
            {((userInfo.username === user.username) || (isAdmin)) &&
            <section className="position-cont-col">
                {loading && <span>loading</span>}
                {error && <span>something went wrong, data not loaded</span>}
                {isAdmin ? <h1>userdetails: {userId}</h1> : <h1>Welcome {userId}</h1>}
                <ShadowContainer className="userdetails-cont">
                    <p className="userdetails-userinfo-txt">personal info:</p>
                    <p>{userInfo.username}</p>
                    <p>{userInfo.email}</p>
                    <div className="userdetails-btn-cont">
                        <BackButton/>
                        {!isAdmin &&
                        <Button
                            type="button"
                            className="green-btn userdetails-update-btn"
                            handleClick={() => history.push(`/updateuser/${userInfo.username}`)}>
                            <MdSystemUpdateAlt className="icon update"/>
                            <span className="btn-txt update-txt">Update user</span>
                        </Button>}
                    </div>
                </ShadowContainer>

                <ShadowContainer className="orange-cont">
                    <h1 className="details-title">Posted movies: {movieData.length}</h1>
                </ShadowContainer>

                <div className="userdetails-movies-cont">
                    {!loading && movieData && movieData.map((movie) => {
                        return (
                            <div
                                key={movie.id}
                                className="userdetails-movie-cont">
                                <Movie
                                    movieId={movie.id}
                                    movieTitle={movie.movieTitle}
                                    movieImage={movie.image}
                                />

                                {isAdmin &&
                                <DeleteButton
                                    handleClick={() => {
                                        deleteMovieReview("movie", movie.id)
                                    }}
                                    name="Delete"/>}
                            </div>)
                    })}
                </div>

                <ShadowContainer className="orange-cont">
                    <h1 className="details-title">Posted reviews: {reviewData.length}</h1>
                </ShadowContainer>
                <div className="userdetails-reviews-cont">
                    {reviewData && reviewData.map((review) => {
                        return (
                                <div key={review.id}>
                                    <Review
                                        reviewId={review.id}
                                        reviewer={review.reviewer}
                                        review={review.review}
                                        reviewRating={review.reviewRating}
                                        badLanguage={review.badLanguage}
                                    />
                                    {isAdmin &&
                                    <DeleteButton
                                        handleClick={() => {
                                            deleteMovieReview("review", review.id)
                                        }}
                                        name="Delete"/>}
                                </div>)
                    })}
                </div>
            </section>}
        </>
    );
}

export default UserDetails;