import React, {useState, useContext} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {Link, useHistory, useParams} from "react-router-dom";
import ShadowContainer from "../shadowcontainer/ShadowContainer";
import SignupButton from "../buttons/SignupButton";
import'../add-update-user/AddUpdateUser.css'
import BackButton from "../buttons/BackButton";


function AddUpdateUser({name}) {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onChange'})
    const source = axios.CancelToken.source();
    const [loading, toggleLoading] = useState(false);
    const history = useHistory();
    const {userId} = useParams();
    const {login}=useContext(AuthContext);

    async function onFormSubmit(data) {
        toggleLoading(true);
        if (name === "adduser") {
            try {
                await axios.post('http://localhost:8080/users/signup', {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                }, {
                    cancelToken: source.token,
                });
            } catch (e) {
                console.error('error: no user posted', e);
            }
        } else if (name === "updateuser") {
            try {
                const token = localStorage.getItem('token');
                await axios.put(`http://localhost:8080/users/${userId}`, {
                    password: data.password,
                    email: data.email,
                    enabled: true,
                }, {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (e) {
                console.error("sorry, user can't be updated" + e)
            }
        } else {
            try {
                const result = await axios.post('http://localhost:8080/authenticate', {
                    username: data.username,
                    password: data.password,
                });
                // log result
                console.log(result.data.jwt);
                login(result.data.jwt);

            } catch (e) {
                console.error(e);
            }
        }
        toggleLoading(false);
        history.push('/signin');
    }

    return (
        <section className="position-cont-col">
            <ShadowContainer className="auuser-cont">
                <div className="title-cont">
                    {name === "adduser" &&
                        <h3 className="title-cont-title">Sign up</h3>}
                    {name === "updateuser" &&
                    <h3 className="title-cont-title">Update profile</h3>}
                    {name === "loginuser" &&
                    <h3 className="title-cont-title">Sign in</h3>}
                </div>
                <form
                    className="auuser-form"
                    onSubmit={handleSubmit(onFormSubmit)}>
                    {console.log(name)}
                    {((name==="adduser")||(name==='loginuser')) &&
                    <label htmlFor="username">
                        Username:
                        <input
                            className="auuser-input"
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
                        {errors.username &&
                        <div className="errormessage">
                            {errors.username.message}
                        </div>}
                    </label>}

                    <label htmlFor="auuser-password"/>
                    Password:
                    <input
                        className="auuser-input"
                        type="password"
                        id="auuser-password"
                        name="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: 'Input required',
                            },
                            minLength: {
                                value: 8,
                                message: 'minimum length 8 characters is required'
                            }
                        })}
                    />
                    {errors.password &&
                    <div className="errormessage">
                        {errors.password.message}
                    </div>}
                    {((name==="adduser")||(name==="updateuser")) &&
                    <label htmlFor="signup-email">
                    Email:
                    <input
                        className="auuser-input"
                        type="email"
                        id="auuser-email"
                        name="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Input required or email not valid',
                            }, validate: value => value.includes('@')
                        })}
                    />
                    </label>}
                    {errors.email &&
                    <div className="errormessage">
                        {errors.email.message}
                    </div>}
                    {name ==='adduser' &&
                        <SignupButton
                            type="submit"
                            name="Sign up"
                        /> }
                    {name==='updateuser' &&
                        <SignupButton
                            type="submit"
                            name="Update"
                        /> }
                    {name==='loginuser' &&
                    <SignupButton
                        type="submit"
                        name="Login"
                    /> }


                </form>
                {!loading &&
                    <div
                        className="auuser-btn-cont">
                        <BackButton/>
                    </div>}
                <div className="auuser-login-cont">
                    <p>Already an account? You can sign in <Link to="/signin">here</Link>.</p>
                </div>

            </ShadowContainer>
        </section>
    );
}

export default AddUpdateUser;