import React,{useState, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useForm} from "react-hook-form";
import axios from "axios";
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import Button from "../../components/buttons/Button";
import {AuthContext} from "../../context/AuthContext";

function UpdateUser({hallo}) {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});
    const [loading,setLoading]=useState(false);
    const history=useHistory();
    const {userId} = useParams();
    const {user}=useContext(AuthContext);
    async function onFormSubmit(data) {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/users/${userId}`, {
                password: data.passwordupdate,
                email: data.emailupdate,
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
        setLoading(false);
    }




    return (

        <section className="position-cont-col">
            <ShadowContainer className="review-input-cont">
                <form onSubmit={handleSubmit(onFormSubmit)}>

                    <label htmlFor="passwordupdate"/>
                    New password:
                    <input
                        type="password"
                        className="password-input"
                        id="passwordupdate"
                        placeholder="type in your new password"
                        {...register("passwordupdate", {
                            required: {
                                value: true,
                                minLength:8,
                                message: 'Sorry, input required, create a password with a minimum of 8 characters',
                            },
                        })}
                    >
                    </input>
                    {errors.passwordupdate && <p>{errors.passwordupdate.message}</p>}
                    <label htmlFor="updateemail"/>
                    New password:
                    <input
                        type="text"
                        className="email-input"
                        id="updateemail"
                        placeholder="type in your new password"
                        {...register("emailupdate", {
                            required: {
                                minLength:8,
                                value: true,
                                //validate: (value) => value.includes('@'),
                                message: 'Sorry, input required, email must be a valid emailadress',
                            },
                        })}
                    >
                    </input>
                    {errors.emailupdate && <p>{errors.emailupdate.message}</p>}



                    <div className="btn-cont">

                        <Button
                            className="green-btn"
                            type="submit">
                            Update
                        </Button>
                    </div>
                </form>
                {!loading && <Button
                    className="back-btn"
                    type="button"
                    handleClick={() => {
                        history.goBack()
                    }}
                >Back</Button>}
            </ShadowContainer>
        </section>
    );
}

export default UpdateUser;