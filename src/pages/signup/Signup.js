import React, { useState} from 'react';
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function SignUp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const source = axios.CancelToken.source();


    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);
        try {
            await axios.post('http://localhost:8080/users/signup', {
                username: username,
                password: password,
                email:email,
            }, {
                cancelToken: source.token,
            });

        } catch(e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (


        <section className="position-cont-col">
                <ShadowContainer className="signup-cont">

<form onSubmit={handleSubmit}>

                <label htmlFor="username-field">
                    Gebruikersnaam:</label>
                    <input
                        type="text"
                        id="username-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />


                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
    <label htmlFor="email-field">
        Gebruikersnaam:</label>
    <input
        type="text"
        id="email-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />



                {error && <p className="error">Dit account bestaat al. Probeer een andere username.</p>}
                <button
                    type="submit"
                    className="form-button"

                >
                    Registreren
                </button>

            </form>

            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
                </ShadowContainer>
        </section>
    );
}

export default SignUp;