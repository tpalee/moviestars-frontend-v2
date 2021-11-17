import React from 'react';
import Button from "./Button";
import {useHistory} from "react-router-dom";
import {FaPlus} from 'react-icons/fa';

function AddReviewButton({handleClick, handleSubmit,name}) {
    const history=useHistory();

    return (
        <Button
            className="green-btn"
            handleClick={handleClick}
        handleSubmit={handleSubmit}>
            <FaPlus className="icon plus"/>
            <span className="btn-txt add-txt">{name}</span>
        </Button>
    );
}

export default AddReviewButton;