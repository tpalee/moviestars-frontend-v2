import React from 'react';
import Button from "./Button";
import {FaUserPlus} from 'react-icons/fa';

function SignupButton({handleClick, handleSubmit,name}) {

    return (
        <Button
            className="green-btn signup-btn"
            handleClick={handleClick}
            handleSubmit={handleSubmit}>

            <FaUserPlus className="user plus"/>

            <span className="btn-txt add-txt">{name}</span>

        </Button>
    );
}

export default SignupButton;