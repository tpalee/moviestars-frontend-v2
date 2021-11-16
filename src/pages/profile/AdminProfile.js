import React, {useContext, useEffect, useState} from 'react';
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import {AuthContext} from '../../context/AuthContext';
import axios from "axios";
import Button from "../../components/buttons/Button";
import '../profile/AdminProfile.css'
import {useHistory} from 'react-router-dom';
function AdminProfile(props) {
    const history=useHistory();
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const[badLanguageData,setBadLanguageData]=useState(null);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        toggleLoading(true);

        async function fetchUserData() {
            try {
                const result = await axios.get('http://localhost:8080/users', {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserData(result.data)
            } catch (e) {
                console.error("no userData fetched" + e)
                toggleError(true);
            }

            try {
                const result = await axios.get('http://localhost:8080/reviews/badlanguage', {
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                setBadLanguageData(result.data)
            } catch (e) {
                console.error("no Harmfull Content data fetched" + e)
                toggleError(true);
            }

        }




        fetchUserData()
        toggleLoading(false)
    }, [])

    console.log(userData);


    return (
        <section className="position-cont-col">
            {loading && <span>loading...</span>}
            {error && <span>something went wrong, no userdata fetched</span>}
            <ShadowContainer className="profile-cont">
                <h2>Welcome {user.username}</h2>
                <div className="position-cont-row pos-admin">
                    <ShadowContainer className="info-cont">
                        <h3>Admin info</h3>
                        <p>username: {user.username}</p>
                        <p>email:{user.email}</p>
                    </ShadowContainer>
                    <ShadowContainer className="user-info">
                        <ul className="ul-users">
                            {userData && userData.map((user) => {
                                return (
                                    <li key={user.username}>
                                        <div className="userlist">
                                            <p>user: {user.username}</p>
                                            <p>email:{user.email}</p>
                                            <Button handleClick={() => {
                                                history.push(`/user/userdetails/${user.username}`)
                                            }}>details</Button>
                                            <Button>delete</Button>
                                        </div>
                                    </li>
                                )

                            })}
                        </ul>
                    </ShadowContainer>
                </div>
            </ShadowContainer>
            {badLanguageData && <ShadowContainer>
                {badLanguageData.map((review)=>{
                    return(
                        <p>{review.review}</p>
                    )
                })}
            </ShadowContainer>}
        </section>
    );
}

export default AdminProfile;