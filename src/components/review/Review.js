import React, {useContext} from 'react';
import ShadowContainer from "../shadowcontainer/ShadowContainer";
import Button from "../buttons/Button";
import {AuthContext} from '../../context/AuthContext';
import '../review/Review.css'
import {useHistory} from "react-router-dom";
import axios from "axios";

function Review({review, reviewRating, badLanguage, reviewer, reviewId}) {
    const {user} = useContext(AuthContext);
    const history = useHistory();
    let color="grey";
    const reviewInfo =
        {
            review,
            reviewRating,
            badLanguage,
            reviewer,
            reviewId,
        };
    const id=reviewId;


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
        history.push(`/movies`)
    }

    if((badLanguage)){
        color="red"
    }
    else{
        color="grey"
    }
console.log(user.username,reviewer);

    return (
        <ShadowContainer className={`review-cont-${color}`}>
            <p>{review}</p>
            <p>{reviewRating}</p>
            <p>{reviewer}</p>
            {user !== null && reviewer === user.username &&
            <Button
                className="green-btn"
                handleClick={() => {
                    history.push(`/updatereview/${reviewId}`, {reviewInfo})
                }}>update Review</Button>}
            <Button
                className="green-btn"
                handleClick={badLanguageHandler}>report harmful content</Button>
        </ShadowContainer>
    );
}

export default Review;