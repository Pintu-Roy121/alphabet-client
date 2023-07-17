import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext();
    const location = useLocation();


    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />

};

export default PrivateRoute;