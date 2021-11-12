import React, {useContext} from 'react';
import {useHistory, Route} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";


function PrivateAdminRoute({isAut, children, ...rest}){
    const {isAuth,isAdmin} = useContext(AuthContext);
    const history=useHistory();

    return(
        <Route {...rest}>
            {isAuth && isAdmin ? children : history.push('/movies')}
        </Route>
    )
}

export default PrivateAdminRoute;