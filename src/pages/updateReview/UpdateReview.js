import React from 'react';
import {useLocation, useParams} from "react-router-dom";
import AddReviewComponent from "../../components/add-update-review/AddReviewComponent";

function UpdateReview() {
    const {reviewId} = useParams();
    const {state}=useLocation();

    return (
        <AddReviewComponent
        state={state}
        reviewId={reviewId}
        />
    );
}

export default UpdateReview;