import React, {useContext} from 'react';
import ShadowContainer from "../../components/shadowcontainer/ShadowContainer";
import {AuthContext} from '../../context/AuthContext';
import Button from "../../components/buttons/Button";
import {useHistory} from 'react-router-dom';

function UserProfile() {

    const {user} = useContext(AuthContext);
const history=useHistory();
const hallo="hallo";
    return (
       <ShadowContainer>
           <h2>Welcome {user.username}</h2>
           <div className="info-cont">
               <p>username: {user.username}</p>
               <p>email:{user.email}</p>
               <Button
               handleClick={()=>{history.push(`/user/profile/${user.username}`)}}
               >Update user</Button>
           </div>

       </ShadowContainer>
    );
}

export default UserProfile;