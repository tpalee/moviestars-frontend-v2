import React from 'react';
import Button from "./Button";
import {TiArrowBack} from 'react-icons/ti';
import {useHistory} from "react-router-dom";

function BackButton() {
    const history=useHistory();
    return (
        <Button
            className="orange-btn back-btn"
            type="button"
            handleClick={() => {history.push('/movies')}}
        >
            <TiArrowBack className="icon back"/>
            <span className="btn-txt back-txt">Back</span>
        </Button>
    );
}

export default BackButton;