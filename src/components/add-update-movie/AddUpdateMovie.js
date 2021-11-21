import React, {useState, useContext, useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import ShadowContainer from "../shadowcontainer/ShadowContainer";
import AddReviewButton from "../buttons/AddReviewButton";
import Button from "../buttons/Button";
import '../add-update-movie/AddUpdateMovie.css'
import {TiArrowBack} from 'react-icons/ti';


function AddUpdateMovie({name}) {
    const {user} = useContext(AuthContext);
    const {updateMovieId} = useParams();
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});
    const [file, setFile] = useState(null);
    const [movieId, setMovieId] = useState(null);
    const [movieData, setMovieData] = useState(null);
    const [loading, toggleLoading] = useState(false);

    const fileMaker = (e) => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        toggleLoading(true);
        if (name !== "add") {
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
    }, [name])


    async function onFormSubmit(data) {
        const {movieTitle, movieGenre, movieDescription} = data;
        const formData = new FormData();
        formData.append('file', file);
        const token = localStorage.getItem('token');
        let imageId;
        let movieId;

        //name 'add' is given as prop by addmovie to check if a movie has to be added or else updated
        if (name === 'add') {
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
                //get the movieId out of the locationheader
                const locationHeader = result.headers.location;
                console.log(locationHeader);
                let id = (locationHeader.lastIndexOf('/'));
                movieId = locationHeader.substring(id + 1);
            } catch (e) {
                console.error(e)
            }

        } else {
            try {
                //set UpdateMovieId to movieId given by movieDetails(useParams)
                movieId = updateMovieId;
                await axios.put(`http://localhost:8080/movies/${updateMovieId}`, {
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
                console.error('no moviedata posted',e)
            }

        }
        //when there is filedata for the image the image will be posted to the db
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
                //get the imageId out of the locationheader
                const locationHeader = result.headers.location;
                let id = (locationHeader.lastIndexOf('/'));
                imageId = locationHeader.substring(id + 1);
            } catch (e) {
                console.error('no image posted in database',e)
            }

            //assign the image to the movie
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
                console.error('no image assigned to movie', e)
            }
        }
        history.push('/movies');
    }


    return (
        <section className="position-cont-col">

            <ShadowContainer className="addmovie-cont">
                <div className="title-cont">
                    {name === "add" ?
                        <h3 className="title-cont-title">Add Movie</h3> :
                        <h3 className="title-cont-title">Update Movie</h3>}
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
                                    {...register("movieTitle",
                                        {
                                            required: {
                                                maxlength: 100,
                                                value: true,
                                                message: 'Sorry, input required',
                                            }
                                        })}
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
                        {errors.movieTitle &&
                        <div className="errormessage">
                            {errors.movieTitle.message}
                        </div>}

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
                            {...register("movieDescription",
                                {
                                    required: {
                                        maxlength: 2000,
                                        value: true,
                                        message: 'Sorry, input required with max-length of 2000 chars',
                                    }
                                })}>
                         </textarea>
                        {errors.movieDescription &&
                        <div className="errormessage">
                            {errors.movieDescription.message}
                        </div>}

                        <div className="movie-file-add-cont">
                            <label htmlFor="movieimage"/> Choose image
                            <input
                                className="movie-input-file"
                                type="file"
                                id="file"
                                name="movieimage"
                                onChange={fileMaker}
                            />
                            {name === 'add' ?
                                <AddReviewButton
                                    type="submit"
                                    className="addreview-btn"
                                    name="Add Movie"
                                /> :
                                <AddReviewButton
                                    type="submit"
                                    className="addreview-btn"
                                    name="Update Movie"
                                />}
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