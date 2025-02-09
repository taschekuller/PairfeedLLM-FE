// src/components/RoleRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

interface RoleRouteProps {
    user: {
        id: string;
        email: string;
        role: string;
    };
    allowedRoles: string[];
}

const RoleRoute = ({ user, allowedRoles } : RoleRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleRoute;
