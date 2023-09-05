import React from 'react';
import { useTech } from '../../context/TechContext';
import TechCard from './TechCard';
import CreateTechModal from './CreateTechModal';
import EditTechModal from './EditTechModal';

function TechList() {
  const { techList, setEditingTech } = useTech();

  return (
    <div>
      <h2>Technology List</h2>
      <CreateTechModal />
      <ul>
        {techList.map(tech => (
          <TechCard key={tech.id} tech={tech} setEditingTech={setEditingTech} />
        ))}
      </ul>
      <EditTechModal />
    </div>
  );
}

export default TechList;
