import React, { useState } from 'react';
import LogoutButton from '../LogoutButton';
import logo from '../../assets/logo.png';
import botao from '../../assets/botao.jpg';
import trash from '../../assets/trash.jpg';
import edit from '../../assets/edit.jpg';
import { useAuthUser } from '../../context/UserContext';
import { useTech } from '../../context/TechContext';
import CreateTechModal from '../CreateTechModal';
import EditTechModal from '../EditTechModal';

function DashboardPage() {
  const { user } = useAuthUser();
  const { techList, createTechnology, deleteTechnology, setEditingTech } = useTech();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [techToEdit, setTechToEdit] = useState(null);

  const handleCreateTech = async (techData) => {
    await createTechnology(techData);
    window.location.reload();
  };

  const handleDeleteTech = async (techId) => {
    await deleteTechnology(techId);
    window.location.reload();
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openEditModal = (tech) => {
    setTechToEdit(tech);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTechToEdit(null);
  };

  return (
    <div className="dashboard-container">
      <div className="img-sair">
        <img className="img" src={logo} alt="Logo" />
        <LogoutButton className="sair" />
      </div>
      <hr />
      <div className="boxNomeEmod">
        <div className="nome-modulo">
          <p className="nome">Olá, {user?.name}!</p>
          <p className="modulo">Módulo: {user?.course_module}</p>
        </div>
      </div>
      <hr />
      <div className="tech-list">
        <div className="modalDeAdicionar">
          <p className='tituloTec'>Tecnologias</p>
          <button className='criarModalB' onClick={openCreateModal}><img src={botao} alt="" /></button>
        </div>
        <div className='retangulo'>
          <ul className='techlist'>
              {techList?.map((tech) => (
                  <li className='content' key={tech.id}>
                      {tech.title} - Nível: {tech.status}
                      <button className="buttoned" onClick={() => openEditModal(tech)}><img src={edit} alt="Editar" /></button>
                      <button className="buttontrash" onClick={() => handleDeleteTech(tech.id)}><img src={trash} alt="Excluir" /></button>
                  </li>
              ))}
          </ul>
        </div>
      </div>
      {isCreateModalOpen && (
        <CreateTechModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onCreate={handleCreateTech}
        />
      )}
      {isEditModalOpen && techToEdit && (
        <EditTechModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          techToEdit={techToEdit}
        />
      )}
    </div>
  );
}

export default DashboardPage;
