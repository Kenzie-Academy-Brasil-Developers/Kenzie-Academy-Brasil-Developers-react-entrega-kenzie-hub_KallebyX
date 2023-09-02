import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/axios';

const UserContext = createContext();

export function useAuthUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const autologin = async () => {
    const token = localStorage.getItem('@TOKEN');

    if (token) {
      try {
        const response = await api.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data); // Correção aqui
      } catch (error) {
        console.error('Erro ao realizar autologin:', error);
      }
    }
  };

  useEffect(() => {
    autologin();
  }, []);

  const registerUser = async (userData) => {
    try {
      const response = await api.post('/users', userData);
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('@TOKEN', data.token);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      throw error;
    }
  };

  const loginUser = async (formData) => {
    try {
      const response = await api.post('/sessions', formData);
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('@TOKEN', data.token);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null); 
    localStorage.removeItem('@TOKEN'); 
  };

  const contextValue = {
    user,
    registerUser,
    loginUser,
    autologin,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}