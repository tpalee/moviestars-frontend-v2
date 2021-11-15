import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import '../addReview/AddReview.css'
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import Button from "../../components/buttons/Button";
import {useLocation, useHistory} from "react-router-dom";


function AddReview() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});
    const {user}=useContext(AuthContext);
    const history = useHistory();
    const {state} = useLocation();
    const [loading,setLoading]=useState(false);


    async function onFormSubmit(data) {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8080/reviews', {
                review: data.review,
                reviewRating: data.rating,
                reviewer: user.username,
                user: {username: user.username},
                movie: {id:state},
                badLanguage: false,
            }, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (e) {
            console.error("sorry, review can't be posted:" + e)
        }
        setLoading(false);
        history.push(`/movies/${state}`)
    }




    return (

        <section className="position-cont-col">
            <ShadowContainer className="review-input-cont">
                <form onSubmit={handleSubmit(onFormSubmit)}>

                    <label htmlFor="review"></label>
                    Review:
                    <textarea
                        className="review-input textarea"
                        type="text"
                        id="review"
                        {...register("review", {
                            required: {
                                maxlength: 400,
                                value: true,
                                message: 'Sorry, input required',
                            }
                        })}
                    />
                    {errors.review && <p>{errors.review.message}</p>}


                    <label htmlFor="movierating"/>
                    Rating:
                    <input
                        type="number"
                        className="review-input rating"
                        id="movierating"
                        placeholder="Rating, min 1.0, max 10.0"
                        {...register("rating", {
                            required: {
                                minimum: 1.0,
                                maximum: 10.0,
                                value: true,
                                message: 'Sorry, input required, pick a number between 1 and 10',
                            },
                        })}
                    >
                    </input>
                    {errors.rating && <p>{errors.rating.message}</p>}
                    <div className="btn-cont">

                        <Button
                            className="green-btn"
                            type="submit">
                            Add Review
                        </Button>
                    </div>
                </form>
                {!loading && <Button
                    className="back-btn"
                    type="button"
                    handleClick={() => {
                        history.goBack()
                    }}
                >Back</Button>}
            </ShadowContainer>
        </section>
    );
}

export default AddReview;