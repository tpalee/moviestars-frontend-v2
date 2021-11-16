import React from 'react';
import '../textinput/Textinput.css'

function Textinput({type,className, id, placeholder, message}) {
    return (
        <input
            type="password"
            className="password-input"
            id="passwordupdate"
            placeholder="type in your new password"
            {...register("passwordupdate", {
                required: {
                    minLength:8,
                    value: true,
                    message: 'Sorry, input required, create a password with a minimum of 8 characters',
                },
            })}
        >
        </input>
    );
}

export default Textinput;