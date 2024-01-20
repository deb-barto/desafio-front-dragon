import React, { useState } from "react";
import axios from "axios";
import "./index.scss";

const PopUpEdit = ({ dragon, photo, onClose, fetchDragons }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(dragon.name);
  const [newType, setNewType] = useState(dragon.type);
  const [newHistories, setNewHistories] = useState(dragon.histories);
  const [newCreatedAt, setNewCreatedAt] = useState(dragon.createdAt);

  const dragonTypes = ["Gelo", "Fogo", "Ácido", "Oriental", "Escultura"];

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const url = `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragon.id}`;
      await axios.put(url, {
        name: newName,
        type: newType,
        histories: newHistories,
        createdAt: newCreatedAt,
      });
      fetchDragons();
      onClose();
    } catch (error) {
      console.error("Error updating dragon:", error);
    }
  };

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm(
      "Tem certeza que deseja deletar este dragão?"
    );

    if (isConfirmed) {
      try {
        const url = `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragon.id}`;
        await axios.delete(url);
        fetchDragons();

        onClose();
      } catch (error) {
        console.error("Error deleting dragon:", error);
      }
    }
  };

  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>{dragon.name}</h2>
        <p>Tipo: {dragon.type}</p>
        <p>Histórias: {dragon.histories}</p>
        <p>Data de Criação: {new Date(dragon.createdAt).toLocaleString()}</p>
        {editing ? (
          <div>
          <div className="Edit-Forms">
            <label>
              Novo Nome:
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </label>
            <label>
              Novo Tipo:
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              >
                <option value="">Selecione o Tipo</option>
                {dragonTypes.map((dragonType) => (
                  <option key={dragonType} value={dragonType}>
                    {dragonType}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Novas Histórias:
              <input
                type="text"
                value={newHistories}
                onChange={(e) => setNewHistories(e.target.value)}
              />
            </label>
            <label>
              Nova Data de Criação:
              <input
                type="datetime-local"
                value={newCreatedAt}
                onChange={(e) => setNewCreatedAt(e.target.value)}
              />
            </label>
          </div>
            <button onClick={handleSaveClick} className="Comment-popup-container-btn">Salvar</button>
          </div>
        ) : (
          <div className="Edit-Btns">
            <button onClick={handleEditClick} className="Comment-popup-container-btn">Editar</button>
            <button onClick={handleDeleteClick} className="Comment-popup-container-btn-delete">Deletar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUpEdit;
