import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/axios';
import { useAuthUser } from './UserContext';

const TechContext = createContext();

export function useTech() {
  const context = useContext(TechContext);
  
  if (!context) {
    throw new Error('useTech deve ser usado dentro de um TechProvider');
  }

  return context;
}

export function TechProvider({ children }) {
  const { userTechs } = useAuthUser();
  const [techList, setTechList] = useState([]);

  useEffect(() => {
    if (userTechs) {
      setTechList(userTechs);
    }
  }, [userTechs]);

  async function fetchTechs() {
    try {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.get('/users/techs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setTechList(response.data);
      }
    } catch (error) {
      console.error('Error fetching technologies:', error);
    }
  }

  async function createTechnology(techData) {
    try {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.post('/users/techs', techData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 200) {
        fetchTechs();
      }
    } catch (error) {
      console.error('Error creating technology:', error);
      if (error.response && error.response.data.message === 'error') {
        alert("You already have this technology. Please update it instead of creating a new one.");
      }
    }
  }

  async function deleteTechnology(techId) {
    try {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.delete(`/users/techs/${techId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        fetchTechs();
      }
    } catch (error) {
      console.error('Erro ao excluir tecnologia:', error);
    }
  }

  async function updateTechnology(techId, techData) {
    try {
      const token = localStorage.getItem("@TOKEN");
      const response = await api.put(`/users/techs/${techId}`, techData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        fetchTechs();
      }
    } catch (error) {
      console.error('Erro ao atualizar tecnologia:', error);
    }
  }

  const contextValue = {
    techList,
    createTechnology,
    deleteTechnology,
    updateTechnology,
    fetchTechs
  };

  return (
    <TechContext.Provider value={contextValue}>
      {children}
    </TechContext.Provider>
  );
}

export default TechProvider;
