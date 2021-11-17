import React, {useContext} from 'react';
import ShadowContainer from "../shadowcontainer/ShadowContainer";
import Button from "../buttons/Button";
import {AuthContext} from '../../context/AuthContext';
import '../review/Review.css'
import {MdSystemUpdateAlt, MdWarning} from 'react-icons/md';
import {useHistory} from "react-router-dom";
import axios from "axios";

function Review({review, reviewRating, badLanguage, reviewer, reviewId}) {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    let color = "grey";
    const id = reviewId;
    const reviewInfo =
        {
            review,
            reviewRating,
            badLanguage,
            reviewer,
            reviewId,
        };


    async function badLanguageHandler() {
        try {
            await axios.patch(`http://localhost:8080/reviews/${id}/badlanguage`, {
                    badLanguage: !badLanguage,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
        } catch (e) {
            console.error(e);
        }
        history.go(0)
    }
    if ((badLanguage)) {
        color = "red"
    } else {
        color = "grey"
    }

    return (
        <ShadowContainer className={`review-cont ${color}`}>
            <h3 className="review-title">review</h3>
            <p className="review-txt">{review}</p>
            <small className="review-small"> reviewed by: {reviewer}</small>

<div className="review-bottom">
    <p className="review-txt">rating: <span className="rating-txt">{reviewRating}</span></p>
            <div className="btn-cont review">
            {user !== null && reviewer === user.username &&

            <Button
                type="button"
                className="green-btn"
                handleClick={() => {history.push(`/updatereview/${reviewId}`, {reviewInfo})}}
            >
                <MdSystemUpdateAlt className="icon update"/>
                <span className="btn-txt update-txt">Update Review</span>
            </Button>}

            <Button
                className="red-btn"
                handleClick={badLanguageHandler}>
                <MdWarning className="icon warning"/>
                <span className="btn-txt warning-txt">Report harmfull content</span>
            </Button>
</div>
</div>
        </ShadowContainer>
    );
}

export default Review;