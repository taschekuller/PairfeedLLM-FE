// src/components/PrivateRoute.jsx

import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  user: {
    id: string;
    email: string;
    role: string;
  }
}

const PrivateRoute = ({ user }: PrivateRouteProps) => {
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
