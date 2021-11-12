import React from 'react';
import {useParams} from 'react-router-dom';

function UpdateUser({hallo}) {
    console.log(hallo)
    const {userId} = useParams();
    return (
        <div>update user</div>
    );
}

export default UpdateUser;