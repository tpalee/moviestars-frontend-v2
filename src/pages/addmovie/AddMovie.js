import React, {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from "axios";
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import '../addmovie/AddMovie.css'

function AddMovie(props) {
    const {user} = useContext(AuthContext);
    const history = useHistory();

    const {register, handleSubmit} = useForm();
    const [file, setFile] = useState(null);

    const fileMaker = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);

    }


    async function onFormSubmit(data) {
        const token = localStorage.getItem('token');
        let movieId;
        let imageId;
        const {movieTitle, movieGenre, movieDescription} = data;
        const formData = new FormData();
        formData.append('file', file)
        console.log(formData.values());

console.log(file);

        try {
            const result = await axios.post('http://localhost:8080/movies', {
                    movieTitle: movieTitle,
                    movieGenre: movieGenre,
                    movieDescription: movieDescription,
                    user: {username: user.username},
                    moviePoster:user.username,

                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const locationHeader = result.headers.location;
            let id = (locationHeader.lastIndexOf('/'));
            movieId = locationHeader.substring(id + 1);
        } catch (e) {
            console.error(e)
        }
if(file!==null){
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
            imageId = locationHeader.substring(id+1);

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
            console.error(e)
        }}
        history.push('/movies');
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

export default AddMovie;