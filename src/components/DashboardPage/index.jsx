import React from 'react';
import LogoutButton from '../LogoutButton';
import logo from '../../assets/logo.png';
import { useAuthUser } from '../../context/UserContext';

function DashboardPage() {
  const { user } = useAuthUser(); // Obtendo o usuário diretamente do contexto

  return (
    <div className="dashboard-container">
      <div className="img-sair">
        <img className="img" src={logo} alt="Logo" />
        <LogoutButton className="sair" />
      </div>
      <hr />
      <div className="boxNomeEmod">
        <div className="nome-modulo">
          <p className="nome">Olá, {user?.name}!</p> {/* Utilizando user diretamente */}
          <p className="modulo">Módulo: {user?.course_module}</p> {/* Utilizando user diretamente */}
        </div>
      </div>
      <hr />
      <div className="paragrafos">
        <p className="p1">Que pena! Estamos em desenvolvimento :(</p>
        <p className="p2">Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
      </div>
    </div>
  );
}

export default DashboardPage;
