import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Store';

export default function Logout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Update Zustand store to set user as logged out
    logout();

    // Redirect to login page
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
