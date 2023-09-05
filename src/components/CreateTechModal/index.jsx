import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const techSchema = z.object({
  title: z.string().min(1, 'O nome da tecnologia é obrigatório'),
  status: z.enum(['Iniciante', 'Intermediário', 'Avançado']),
});

export default function CreateTechModal({ isOpen, onClose, onCreate }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(techSchema),
  });

  const onSubmit = (data) => {
    onCreate(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="create-tech-modal">
        <h2>Criar Nova Tecnologia</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-content">
            <label htmlFor="title">Nome da Tecnologia</label>
            <input
              type="text"
              id="title"
              {...register('title')}
            />
            {errors.title && <span className="error">{errors.title.message}</span>}
            
            <label htmlFor="status">Nível</label>
            <select
              id="status"
              {...register('status')}
            >
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button className="create-button" type="submit">
              Criar
            </button>
            <button className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
