import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Authcontext'; // Make sure the path is correct

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    
    if (!currentUser) {
        // Redirect them to the login page, but save the current location they were trying to go to
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
