import React from 'react';
import {useHistory} from "react-router-dom";
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import Button from "../../components/buttons/Button";
import '../welcome/Welcome.css';
import {MdLocalMovies} from 'react-icons/md';


function Welcome() {
    const history = useHistory();

    return (
        <section className="position-cont-col">

            <ShadowContainer className="welcome-cont">

                <h1 className="welcome-title">Welcome to Moviestars!</h1>

                <p className="welcome-txt">
                    Check our moviedatabase to see if a movie is worth watching!
                    When you sign up to Moviestars you can review our movies and help other moviefanatics with their
                    struggle finding a decent movie.
                    With an account it's also possible to upload your movie-info if the movie is not in our database.
                    Other members can and will review your movie!
                </p>

                <span>

                    <q>Hasta la vista, baby</q>

                    <small className="welcome-small">A. Schwarzenegger</small>

                </span>

                <div className="welcome-btn-cont">

                    <Button
                        className="orange-btn"
                        handleClick={() => {
                            history.push('/movies')
                        }}
                    >

                        <MdLocalMovies className="icon movie"/>

                        <span className="btn-txt welcome-btn">Continue to Moviestars</span>

                    </Button>

                </div>

            </ShadowContainer>

        </section>

    );
}

export default Welcome;