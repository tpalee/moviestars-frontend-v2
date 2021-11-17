import React, {useState} from 'react';
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import './Signup.css';
import {TiArrowBack} from 'react-icons/ti'
import Button from "../../components/buttons/Button";

function SignUp() {

    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onChange'})

    const source = axios.CancelToken.source();


    const [loading, toggleLoading] = useState(false);
    const history = useHistory();

    async function onFormSubmit(data) {
        console.log(data);
        toggleLoading(true);
        try {
            await axios.post('http://localhost:8080/users/signup', {
                username: data.username,
                password: data.password,
                email: data.email,
            }, {
                cancelToken: source.token,
            });

        } catch (e) {
            console.error(e);
        }
        toggleLoading(false);
    }

    return (


        <section className="position-cont-col">
            <ShadowContainer className="signup-cont">

                <form onSubmit={handleSubmit(onFormSubmit)}>

                    <label htmlFor="username"/>
                    Username:
                    <input
                        name="username"
                        type="text"
                        id="username-field"
                        {...register("username", {
                            required: {
                                value: true,
                                message: 'Input required',
                            }
                        })}
                    />
                    {errors.username && <span>{errors.username.message}</span>}

                    <label htmlFor="signup-password"/>
                    Password:
                    <input
                        type="password"
                        id="signup-password"
                        name="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: 'Input required',
                            },
                            minLength:{value:8,
                            message:'minimum length 8 characters is required'}
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}

                    <label htmlFor="signup-email"/>
                    Email:
                    <input
                        type="text"
                        id="signup-email"
                        name="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Input required or email not valid',
                            },validate: value => value.includes('@'), message: "error message"
                        })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}

                    <Button
                        type="submit"
                        className="green-btn"
                    >
                        Sign up
                    </Button>

                </form>
                <Button
                    className="orange-btn"
                    type="button"
                    handleClick={() => {history.push('/movies')}}
                >
                    <TiArrowBack className="icon back"/>
                    <span className="btn-txt back-txt">Back</span>
                </Button>
                <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
            </ShadowContainer>
        </section>
    );
}

export default SignUp;