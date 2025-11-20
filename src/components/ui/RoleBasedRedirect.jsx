import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleBasedRedirect = ({ isAuthenticated, userRole, redirectDelay = 1000 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !userRole) return;

    const timer = setTimeout(() => {
      const dashboardRoutes = {
        brand: '/dashboard/brand',
        creator: '/dashboard/creator',
        agency: '/dashboard/agency',
        talent: '/dashboard/talent',
      };

      const targetRoute = dashboardRoutes?.[userRole] || '/dashboard';
      navigate(targetRoute, { replace: true });
    }, redirectDelay);

    return () => clearTimeout(timer);
  }, [isAuthenticated, userRole, redirectDelay, navigate]);

  return null;
};

export default RoleBasedRedirect;