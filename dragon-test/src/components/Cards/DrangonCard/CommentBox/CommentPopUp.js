import React, { useState } from "react";
import "./index.scss"

const CommentPopUp = ({ dragonId, onClose, onCommentSubmit }) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      return;
    }

    const storedComments =
      JSON.parse(localStorage.getItem("dragonComments")) || {};
    const dragonComments = storedComments[dragonId] || [];
    const updatedComments = [...dragonComments, comment];
    storedComments[dragonId] = updatedComments;
    localStorage.setItem("dragonComments", JSON.stringify(storedComments));

    onCommentSubmit(updatedComments);
    setComment("");
    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div className="Comment-popup-backdrop">
      <div className="Comment-popup-container">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2  className="Comment-popup-container-txt">Adicionar Comentário</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            placeholder="Digite seu comentário..."
            value={comment}
            onChange={handleInputChange}
          />
          <button type="submit" className="Comment-popup-container-btn">Enviar Comentário</button>
        </form>
      </div>
    </div>
  );
};

export default CommentPopUp;