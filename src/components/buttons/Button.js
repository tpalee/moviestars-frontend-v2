import React from "react";
import './Button.css';

function Button({children, className, handleClick}) {

    return (
        <button className={`default-btn ${className}`} onClick={handleClick}>
            <span>
            {children}
            </span>
        </button>
    )
}

export default Button;