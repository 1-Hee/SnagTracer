// libs
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';

// assets

// components

const RootRedirectPage = () => {
    return isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

export default RootRedirectPage;

