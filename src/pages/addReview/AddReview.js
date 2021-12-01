import React from 'react';
import {useLocation} from "react-router-dom";
import AddReviewComponent from "../../components/add-update-review/AddReviewComponent";


function AddReview() {
    const {state} = useLocation();

    return (
        <AddReviewComponent
            name="add"
            state={state}/>
    )

}

export default AddReview;