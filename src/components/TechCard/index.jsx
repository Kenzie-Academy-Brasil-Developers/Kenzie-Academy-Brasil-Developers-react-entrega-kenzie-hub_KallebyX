import React from 'react';
import { useTech } from '../../context/TechContext';

function TechCard({ tech }) {
  const { deleteTechnology } = useTech();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this technology?")) {
      await deleteTechnology(tech.id);
    }
  };

  return (
    <li>
      <p>{tech.title}</p>
      <p>{tech.status}</p>
      <button onClick={() => setEditingTech(tech)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TechCard;
