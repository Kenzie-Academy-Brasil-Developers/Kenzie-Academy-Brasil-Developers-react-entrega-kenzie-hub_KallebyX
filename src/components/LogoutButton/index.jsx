import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../context/UserContext';

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuthUser(); 

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Sair</button>
  );
}

export default LogoutButton;
