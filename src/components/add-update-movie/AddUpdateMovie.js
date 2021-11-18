import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import ShadowContainer from "../shadowcontainer/ShadowContainer";
import AddReviewButton from "../buttons/AddReviewButton";
import Button from "../buttons/Button";
import {TiArrowBack} from 'react-icons/ti';


function AddUpdateMovie({name}) {
    const {user} = useContext(AuthContext);
    const {updateMovieId} = useParams();
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});
    const [file, setFile] = useState(null);
    const[movieId,setMovieId]=useState(null);
    const [movieData, setMovieData] = useState(null);
    const [loading, toggleLoading]=useState(false);

    const fileMaker = (e) => {
        setFile(e.target.files[0]);
    }

useEffect(()=>{
    toggleLoading(true);
if(name!=="add"){
setMovieId(updateMovieId);
    async function fetchMovie() {
        try {
            const result = await axios.get(`http://localhost:8080/movies/${updateMovieId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            setMovieData(result.data)
            console.log(result.data);
        } catch (e) {
            console.error("moviedata can't be fetched", e);
        }
    }
    fetchMovie();
    toggleLoading(false);
}
},[])



    async function onFormSubmit(data) {
        const {movieTitle, movieGenre, movieDescription} = data;
        const formData = new FormData();
        formData.append('file', file);
        const token = localStorage.getItem('token');
        let imageId;
        let movieId;
        if(name==='add'){
        try {
            const result = await axios.post('http://localhost:8080/movies', {
                    movieTitle: movieTitle,
                    movieGenre: movieGenre,
                    movieDescription: movieDescription,
                    user: {username: user.username},
                    moviePoster: user.username,

                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const locationHeader = result.headers.location;
            console.log(locationHeader);
            let id = (locationHeader.lastIndexOf('/'));
            movieId = locationHeader.substring(id + 1);
        } catch (e) {
            console.error(e)
        }}
        else{
            try {
                movieId=updateMovieId;
                const result = await axios.put(`http://localhost:8080/movies/${updateMovieId}`, {
                        movieTitle: movieTitle,
                        movieGenre: movieGenre,
                        movieDescription: movieDescription,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
            } catch (e) {
                console.error(e)
            }

            }
        if (file !== null) {
            try {
                const result = await axios.post('http://localhost:8080/images', formData
                    , {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                const locationHeader = result.headers.location;
                let id = (locationHeader.lastIndexOf('/'));
                console.log(id)
                imageId = locationHeader.substring(id + 1);
            } catch (e) {
                console.error(e)
            }

            try {
                await axios.patch(`http://localhost:8080/movies/${movieId}/images/${imageId}`, {
                        image: {id: `${imageId}`}
                    }
                    , {
                        headers: {
                            'Content-Type': "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
            } catch (e) {
                console.error('uploading failed' + e)
            }
        }
        history.push('/movies');
    }


    return (
        <section className="position-cont-col">

            <ShadowContainer className="addmovie-cont">
                <div className="title-cont">
                    <h3
                        className="title-cont-title">Add Movie
                    </h3>
                </div>

                <div className="movie-form-cont">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="movie-title-genre-cont">
                            <label htmlFor="movietitle">
                                Movietitle:
                                <input
                                    type="text"
                                    className="movie-input title"
                                    id="movietitle"
                                    name="movietitle"
                                    {...register("movieTitle")}
                                />
                            </label>

                            <label
                                htmlFor="moviegenre"
                                className="movie-genre">genre:
                                <select
                                    className="movie-select"
                                    {...register("movieGenre")}>
                                    <option value="action">action</option>
                                    <option value="thriller">thriller</option>
                                    <option value="drama">drama</option>
                                    <option value="comedy">comedy</option>
                                    <option value="horror">horror</option>
                                    <option value="musical">musical</option>
                                    <option value="animation">animation</option>
                                    <option value="other">other</option>
                                </select>
                            </label>
                        </div>

                        <label
                            htmlFor="moviedescription">
                            Movie description:
                        </label>
                        <textarea
                            className="movie-input textarea"
                            name="moviedescription"
                            id="moviedescription"
                            placeholder="description of the movie"
                            cols="30" rows="10"
                            {...register("movieDescription")}>
                         </textarea>

                        <div className="movie-file-add-cont">
                            <label htmlFor="movieimage"/> Choose image
                            <input
                                className="movie-input-file"
                                type="file"
                                id="file"
                                name="movieimage"
                                onChange={fileMaker}
                            />
                            <AddReviewButton
                                id="add-movie-btn"
                                type="submit"
                                name="Add Movie"
                            />
                        </div>
                    </form>

                    <Button
                        className="orange-btn"
                        type="button"
                        handleClick={() => {
                            history.push('/movies')
                        }}>
                        <TiArrowBack className="icon back"/>
                        <span className="btn-txt back-txt">Back</span>
                    </Button>

                </div>
            </ShadowContainer>
        </section>
    );
}

export default AddUpdateMovie;