import React from 'react';
import Button from "./Button";
import {MdDelete} from 'react-icons/md'

function DeleteButton({name,handleClick}) {
    return (
        <Button
            className="red-btn delete-btn"
            handleClick={handleClick}>

            <MdDelete className="icon delete"/>

            <span className="delete-btn">{name}</span>

        </Button>
    );
}

export default DeleteButton;