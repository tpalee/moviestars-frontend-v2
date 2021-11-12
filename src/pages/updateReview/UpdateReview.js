import React from 'react';
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import Button from "../../components/buttons/Button";
import {useForm} from 'react-hook-form';
import {useLocation, useHistory, useParams} from "react-router-dom";
import axios from "axios";

function UpdateReview() {
    const {reviewId} = useParams();
    const {state}=useLocation();
    const history=useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});

    async function onFormSubmit(data) {
        console.log(data);
       try {
            const token = localStorage.getItem('token');
            axios.put(`http://localhost:8080/reviews/${reviewId}`, {
                review: data.review,
                reviewRating: data.rating,
            }, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (e) {
            console.error("sorry, review can't be posted:" + e)
        }

    }



    console.log(state);
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
                        defaultValue={state.review}
                        {...register("review",{
                            required: {
                                maxlength:400,
                                value: true,
                                message: 'Sorry, input required',
                            }})}
                    />
                    {errors.review && <p>{errors.review.message}</p>}


                    <label htmlFor="movierating"></label>
                    Rating:
                    <input
                        type="number"
                        className="review-input rating"
                        id="movierating"
                        placeholder="Rating, min 1.0, max 10.0"
                        {...register("rating", {
                            required: {
                                minimum:1.0,
                                maximum:10.0,
                                value: true,
                                message: 'Sorry, input required, pick a number between 1 and 10',
                            },
                        })}
                    >
                    </input>
                    {errors.rating && <p>{errors.rating.message}</p>}
                    <div className="btn-cont">
                        <Button
                            className="back-btn"
                            handleClick={() => {
                                history.push(`/movies`)
                            }}
                        >Back</Button>
                        <Button
                            className="green-btn"
                            type="submit">
                            Add Review
                        </Button>
                    </div>
                </form>
            </ShadowContainer>
        </section>
    );
}

export default UpdateReview;