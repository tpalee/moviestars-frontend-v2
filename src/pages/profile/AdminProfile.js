import React, {useContext, useEffect, useState} from 'react';
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import {AuthContext} from '../../context/AuthContext';
import axios from "axios";
import Button from "../../components/buttons/Button";
import '../profile/AdminProfile.css'
import {useHistory} from 'react-router-dom';
import Review from "../../components/review/Review";
import {MdDelete} from 'react-icons/md'

function AdminProfile(props) {
    const history=useHistory();
    const {user, isAdmin} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const[badLanguageData,setBadLanguageData]=useState(null);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [dataChange, setDataChange]=useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        toggleLoading(true);

        async function fetchUserData() {
            try {
                setDataChange(false);
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
    }, [dataChange===true])



    async function deleteitem(item){
        const token = localStorage.getItem('token');
        let url="";
        try{
            if(typeof item == 'number'){url=`http://localhost:8080/reviews/${item}`}
                else {url=`http://localhost:8080/users/${item}`}
            await axios.delete(url, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch(e){
            console.error("sorry, can't delete review", e)
        }
        setDataChange(true);
    }

    return (
        <section className="position-cont-col">
            {loading && <span>loading...</span>}
            {error && <span>something went wrong, no userdata fetched</span>}
                <ShadowContainer className="orange-cont">
                    <h1 className="moviedetails-reviews-title">Welcome {user.username}</h1>
                </ShadowContainer>
                    <ShadowContainer className="info-cont">
                        <h3>Admin info</h3>
                        <p>username: {user.username}</p>
                        <p>email:{user.email}</p>
                    </ShadowContainer>
            <ShadowContainer className="orange-cont">
                <h1 className="moviedetails-reviews-title">Userdata</h1>
            </ShadowContainer>
                    <ShadowContainer className="user-info">
                        <ul className="ul-users">
                            {userData && userData.map((appuser) => {
                                return (
                                    <li key={appuser.username} className="user-li">
                                        <div className="userlist">
                                            <p className="user-detail">user: {appuser.username}</p>
                                            <p className="user-email">email:{appuser.email}</p>
                                            <Button
                                            className="green-btn"
                                                handleClick={() => {history.push(`/user/userdetails/${user.username}`)}}
                                            >
                                                details
                                            </Button>
                                            {appuser.username!=='admin' &&
                                            <Button
                                                className="red-btn"
                                            handleClick={()=>{deleteitem(appuser.username)}}>
                                                <MdDelete className="icon delete"/>
                                                <span className="btn-txt delete-btn">Delete</span>
                                            </Button>}
                                        </div>
                                    </li>
                                )

                            })}
                        </ul>
                    </ShadowContainer>
            <ShadowContainer className="orange-cont">
                <h1 className="moviedetails-reviews-title">Reviews with harmfull content</h1>
            </ShadowContainer>

                {badLanguageData && badLanguageData.map((review)=>{
                    return(<>
                            <Review
                                key={review.id}
                                reviewId={review.id}
                                reviewer={review.reviewer}
                                review={review.review}
                                reviewRating={review.reviewRating}
                                badLanguage={review.badLanguage}
                            />

                            <Button
                                className="red-btn"
                                handleClick={()=>{deleteitem(review.id)}}>
                                <MdDelete className="icon delete"/>
                                <span className="btn-txt delete-btn">Delete Review</span>
                            </Button>
                        </>
                    )
                })}

        </section>
    );
}

export default AdminProfile;