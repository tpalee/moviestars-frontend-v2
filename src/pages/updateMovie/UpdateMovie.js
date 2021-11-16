import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useHistory, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from "axios";
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import '../addmovie/AddMovie.css'
import defaultImage from '../../assets/img/defaultmovie.jpg'

function UpdateMovie(props) {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const {movieId} = useParams();
    const {register, handleSubmit} = useForm();
    const [file, setFile] = useState(null);
    const [movieData, setMovieData] = useState();

    useEffect(() => {
        async function fetchMovie() {
            try {
                const result = await axios.get(`http://localhost:8080/movies/${movieId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                setMovieData(result.data)
            } catch (e) {
                console.error("moviedata can't be fetched", e);
            }
        }
        fetchMovie();
    }, [])


    const fileMaker = (e) => {
        //console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }


    async function onFormSubmit(data) {
        const token = localStorage.getItem('token');
        let imageId;
        const {movieTitle, movieGenre, movieDescription} = data;
        const formData = new FormData();
        formData.append('file', file)
        console.log(file);
        console.log(data);

        try {
            const result = await axios.put(`http://localhost:8080/movies/${movieId}`, {
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
        //(file !== null)
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


    // history.push('/movies');
}


return (
    <section className="position-cont-col">
        <ShadowContainer className="addmovie-cont">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <label htmlFor="movietitle-field">
                    Movietitle:
                    <input
                        type="text"
                        id="movietitle-field"
                        name="movietitle"
                        {...register("movieTitle")}
                    />
                </label>
                <label htmlFor="moviegenre">genre:</label>
                <select {...register("movieGenre")}>
                    <option value="action">action</option>
                    <option value="thriller">thriller</option>
                    <option value="drama">drama</option>
                    <option value="comedy">comedy</option>
                    <option value="horror">horror</option>
                    <option value="musical">musical</option>
                    <option value="animation">animation</option>
                    <option value="other">scifi</option>
                </select>
                <label htmlFor="moviedescription">Opmerkingen:</label>
                <textarea name="moviedescription"
                          id="moviedescription"
                          placeholder="description of the movie"
                          cols="30" rows="10"
                          {...register("movieDescription")}>
            </textarea>
                <label htmlFor="movieimage">Add image</label>
                <input
                    type="file"
                    id="file"
                    name="movieimage"
                    onChange={fileMaker}
                />
                <button
                    type="submit"
                    className="form-button"
                    //disabled={loading}
                >
                    Add movie
                </button>

            </form>
        </ShadowContainer>
    </section>
);
}

export default UpdateMovie;