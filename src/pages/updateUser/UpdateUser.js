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
                email: 'thieulee@hotmail.com',
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
                    Rating:
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
                    {errors.passwordupdate && <p>{errors.passwordupdate.message}</p>}



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