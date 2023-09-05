import React, { useState, useEffect } from 'react';
import { useTech } from '../../context/TechContext';

function EditTechModal({ isOpen, onClose, techToEdit }) {
  const { updateTechnology } = useTech();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (techToEdit) {
      setTitle(techToEdit.title);
      setStatus(techToEdit.status);
    }
  }, [techToEdit]);

  const handleUpdate = () => {
    updateTechnology(techToEdit.id, { title, status });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Edit Technology</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditTechModal;
