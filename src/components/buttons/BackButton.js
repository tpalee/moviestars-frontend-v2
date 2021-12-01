import React from 'react';
import Button from "./Button";
import {TiArrowBack} from 'react-icons/ti';


function BackButton({handleClick}) {

    return (
        <Button
            className="orange-btn back-btn"
            type="button"
            handleClick={handleClick}>

            <TiArrowBack className="icon back"/>

            <span className="btn-txt back-txt">Back</span>

        </Button>
    );
}

export default BackButton;