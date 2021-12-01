import React, {useContext} from 'react';
import {useHistory, Route} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";


function PrivateRoute({isAut, children, ...rest}){
    const {isAuth} = useContext(AuthContext);
    const history=useHistory();

    return(
        <Route {...rest}>
            {isAuth  ? children : history.push('/movies')}
        </Route>
    )
}

export default PrivateRoute;