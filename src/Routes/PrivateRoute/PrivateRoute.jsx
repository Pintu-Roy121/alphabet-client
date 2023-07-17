import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider/UserProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const location = useLocation();
    console.log(user);

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />

};

export default PrivateRoute;