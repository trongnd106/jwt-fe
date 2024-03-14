import { useEffect, useContext } from 'react';
import {
    Route
} from "react-router-dom";
import { useHistory, Redirect } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);

    if(user && user.isAuthenticated === true){
        return (
            <>
                <Route path={props.path} component={props.component}/>  
            </>
        )
    } else {
        return <Redirect to = '/login'></Redirect>
    }    
}

export default PrivateRoutes;