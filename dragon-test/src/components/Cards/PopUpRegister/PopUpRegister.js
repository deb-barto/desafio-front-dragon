import React, { useState } from "react"
import "./index.scss"

const PopUpRegister = ({ onClose, onAddDragon }) => {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [histories, setHistories] = useState("")

  const dragonTypes = ["Gelo", "Fogo", "Ácido", "Oriental", "Escultura"]

  const handleAddDragon = () => {
    const newDragon = {
      createdAt: new Date().toISOString(),
      name,
      type,
      histories,
    };

    onAddDragon(newDragon)
    onClose()
  }

  return (
    <div className="Register-popup-backdrop">
      <div className="Register-popup-container">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Criar Dragão</h2>
        <label>
          <p>Nome:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <p>Tipo:</p>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Selecione o Tipo</option>
            {dragonTypes.map((dragonType) => (
              <option key={dragonType} value={dragonType}>
                {dragonType}
              </option>
            ))}
          </select>
        </label>
        <label>
          <p>História:</p>
          <textarea
            value={histories}
            onChange={(e) => setHistories(e.target.value)}
          />
        </label>
        <button
          onClick={handleAddDragon}
          className="Comment-popup-container-btn"
        >
          Adicionar Dragão
        </button>
      </div>
    </div>
  )
}

export default PopUpRegister
