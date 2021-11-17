import React from 'react';
import {useLocation, useHistory, useParams} from "react-router-dom";
import AddReviewComponent from "../../components/addreviewcomponent/AddReviewComponent";

function UpdateReview() {
    const {reviewId} = useParams();
    const {state}=useLocation();

    return (
        <AddReviewComponent
        state={state}
        reviewId={reviewId}/>
    );
}

export default UpdateReview;