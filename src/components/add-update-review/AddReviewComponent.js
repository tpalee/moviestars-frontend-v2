import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import BackButton from "../../components/buttons/BackButton";
import AddReviewButton from "../../components/buttons/AddReviewButton";
import './/AddReviewComponent.css'
import {FaPlus} from 'react-icons/fa';


function AddReviewComponent({name, state, reviewId}) {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});
    const {user} = useContext(AuthContext);
    const history = useHistory();
    const [reviewData,setReviewData]=useState("");
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        setLoading(true);
        if(name!=="add"){
            async function fetchReviewData(){
                try{
                    const result = await axios.get(`http://localhost:8080/reviews/${reviewId}`)
                    console.log(result.data.review);
                    setReviewData(result.data.review);
                }
                catch(e){
                    console.error("reviewdata not fetched", e)
                }
            }
            fetchReviewData();
        }
        setLoading(false);
    },[])

    async function onFormSubmit(data) {
        if (name === 'add') {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                await axios.post('http://localhost:8080/reviews', {
                    review: data.review,
                    reviewRating: data.rating,
                    reviewer: user.username,
                    user: {username: user.username},
                    movie: {id: state},
                    badLanguage: false,
                }, {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
            } catch (e) {
                console.error("error, review not posted:" + e);
            }
        } else

        {
            try {
                const token = localStorage.getItem('token');
                axios.put(`http://localhost:8080/reviews/${reviewId}`, {
                    review: data.review,
                    reviewRating: data.rating,
                }, {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
            } catch (e) {
                console.error("error, review not updated" + e);
            }
        }
        setLoading(false);
        history.goBack();
    }

    return (
        <section className="position-cont-col">
            {loading && <span>loading...</span>}
            {!loading && <ShadowContainer className="review-input-cont">
                <div className="title-cont">
                    <FaPlus className="icon addreview"/>
                    {name === "add" ?
                        <h3 className="title-cont-title">Add Review</h3> :
                        <h3 className="title-cont-title">Update Review</h3>}
                </div>
                <div className="form-cont">
                    <form onSubmit={handleSubmit(onFormSubmit)}>

                        <label htmlFor="review"/>
                        Review:
                        <textarea
                            className="review-input textarea"
                            type="text"
                            id="review"
                            defaultValue={reviewData}
                            {...register("review", {
                                required: {
                                    maxlength: 400,
                                    value: true,
                                    message: 'Sorry, input required',
                                }
                            })}
                        />
                        {errors.review &&
                        <div className="errormessage">
                            {errors.review.message}
                        </div>}

                        <div className="btn-cont-addreview">
                            <div className="rating-cont">

                                <label
                                    htmlFor="movierating"
                                    className="review-input label"/>
                                Rating:
                                <input
                                    type="number"
                                    className="review-input rating"
                                    id="movierating"
                                    placeholder="Rating, min 1.0, max 10.0"
                                    {...register("rating", {
                                            required: {
                                                value: true,
                                                message: 'Sorry, input required, pick a number between 1 and 10',
                                            }, validate: {
                                                positive: v => parseInt(v) > 0,
                                                lessThanTen: v => parseInt(v) <= 10,
                                            }
                                        }
                                    )}
                                >
                                </input>
                            </div>

                            {errors.rating &&
                            <div className="errormessage">{errors.rating.message}</div>}
                            {name === 'add' ?
                                <AddReviewButton
                                    type="submit"
                                    className="addreview-btn"
                                    name="Add Review"
                                /> :
                                <AddReviewButton
                                    type="submit"
                                    className="addreview-btn"
                                    name="Update Review"
                                />}
                        </div>
                    </form>

                    <BackButton
                        className="back-btn-review"
                    />
                </div>
            </ShadowContainer>}
        </section>
    )
}

export default AddReviewComponent;