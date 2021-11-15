import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Movie from "../../components/movie/Movie";
import Button from "../../components/buttons/Button";

function UserDetails(props) {
    const {isAdmin,user} = useContext(AuthContext);
    const {userId}=useParams();
    const token = localStorage.getItem('token');
    const history=useHistory();
    const [loading,toggleLoading]=useState(false);
    const [error,toggleError]=useState(false);
    const [userInfo,setUserInfo]=useState({});
    const [movieData,setMovieData]=useState([]);
    const [reviewData,setReviewData]=useState([]);


    useEffect(()=>{
        toggleLoading(true);
        async function fetchUserData(){
console.log(userId)
            try {
                const result= await axios.get(`http://localhost:8080/users/${userId}`,{
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })

setUserInfo(result.data);
            }

            catch(e){
                console.error("no userData fetched" + e)
                toggleError(true);
            }

        }
        fetchUserData()
        toggleLoading(false)
    },[userId])



    useEffect(()=>{
        toggleLoading(true);
        async function fetchMovieData(){

            try {
                const result= await axios(`http://localhost:8080/users/${userId}/movies`,{
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                setMovieData(result.data)
            }
            catch(e){
                console.error("no MovieData fetched" + e)
                toggleError(true);
            }
        }
        fetchMovieData()
        toggleLoading(false)
    },[userId])

    useEffect(()=>{
        toggleLoading(true);
        async function fetchReviewData(){

            try {
                const result= await axios(`http://localhost:8080/users/${userId}/reviews`,{
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                setReviewData(result.data)
            }
            catch(e){
                console.error("no ReviewData fetched" + e)
                toggleError(true);
            }
        }
        fetchReviewData()
        toggleLoading(false)
    },[userId])

    return (
        <>
            {userInfo.username===user.username &&
        <section className="position-cont-col">
            {loading && <span>loading</span>}
            {error && <span>something went wrong, data not loaded</span>}
            {isAdmin ? <h1>userdetails: {userId}</h1> : <h1>Welcome {userId}</h1>}
        <ShadowContainer>
           <h2>personal info:</h2>
        <p>{userInfo.username}</p>
            <p>{userInfo.email}</p>
            {!isAdmin && <Button handleClick={()=>history.push(`/updateuser/${userInfo.username}`)}>update {userInfo.username}</Button>}


        </ShadowContainer>
            <ShadowContainer>
                {movieData && movieData.map((movie,index) => {
                    return <Movie
                        key={index}
                        movieId={movie.id}
                        movieTitle={movie.movieTitle}
                        movieImage={movie.image}
                        movieRating={movie.movieRating}
                    />
                })}
            </ShadowContainer>
            <ShadowContainer>
                {reviewData && reviewData.map((review,index) => {
                    return(<div key={index}>
                      <p>{review.review}</p>
                        </div>)
                            })}
            </ShadowContainer>
        </section>}
        </>
    );
}

export default UserDetails;