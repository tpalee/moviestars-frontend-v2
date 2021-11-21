import React, {createContext, useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    let admin=false;
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        isAdmin:false,
        status: 'pending',
    });

    const history = useHistory();

    // MOUNTING EFFECT
    useEffect(() => {

        // get JWT
        const token = localStorage.getItem('token');

        // if token, get userData
        if (token) {
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }

    },[]);

    function login(JWT) {
        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);
        fetchUserData(decoded.sub, JWT, '/movies');
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            isAdmin:false,
            user: null,
            status: 'done',
        });

        console.log('user logged out!');
        history.push('/movies');
    }


    async function fetchUserData(id, token, redirectUrl) {
        try {
            const result = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
console.log(result.data);
            const username=result.data.username;

                if(username==='admin'){
                    admin=true;
                }
                else{
                    admin=false;
                }

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                isAdmin:admin,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                },
                status: 'done',
            });

console.log(admin);
            if (redirectUrl) {
                history.push(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            toggleIsAuth({
                isAuth: false,
                user: null,
                isAdmin:false,
                status: 'done',
            });
        }
    }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        isAdmin:isAuth.isAdmin,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <span>Loading...</span>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;