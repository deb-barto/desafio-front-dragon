import React, { useState, useEffect } from "react"
import CommentPopUp from "./CommentBox/CommentPopUp"
import LikeButton from "./Like/LikeButton"
import SharedButton from "./SharedButton/SharedButton"
import CommentButton from "./CommentBox/CommentButton"
import ExpandableText from "./ExpandableText"
import { useAuth0 } from "@auth0/auth0-react"
import "./index.scss";

const DragonCard = ({ dragon, photo, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [comments, setComments] = useState([])
  const { user, isAuthenticated } = useAuth0()
  const imageUrl = photo && photo.urls.small

  useEffect(() => {
    const storedLikedDragons =
      JSON.parse(localStorage.getItem("likedDragons")) || [];
    const isDragonLiked = storedLikedDragons.includes(dragon.createdAt);
    setIsLiked(isDragonLiked)

    const storedComments =
      JSON.parse(localStorage.getItem("dragonComments")) || {}
    const dragonComments = storedComments[dragon.id] || []
    setComments(dragonComments)
  }, [dragon.createdAt, dragon.id])

  const handleLikeClick = () => {
    const storedLikedDragons =
      JSON.parse(localStorage.getItem("likedDragons")) || [];

    if (isLiked) {
      const updatedLikedDragons = storedLikedDragons.filter(
        (date) => date !== dragon.createdAt
      );
      localStorage.setItem("likedDragons", JSON.stringify(updatedLikedDragons))
    } else {
      const updatedLikedDragons = [...storedLikedDragons, dragon.createdAt]
      localStorage.setItem("likedDragons", JSON.stringify(updatedLikedDragons))
    }
    setIsLiked(!isLiked);
  };

  const handleCommentButtonClick = () => {
    setShowCommentBox(!showCommentBox)
  };

  const handleCommentSubmit = (newComments) => {
    setComments(newComments)
    setShowCommentBox(false)
  };

  return (
    isAuthenticated && (
      <div className={`Card Card-DragonPost ${isLiked ? "liked" : ""}`}>
        <div className="Card-Container">
          <div className="Card-Header">
            <article className="Card-Profile-Group">
              {user?.picture && (
                <img
                  src={user.picture}
                  alt={user?.name}
                  className="Card-Profile-Img"
                />
              )}
              <h2 className="Card-Profile-Name">{user?.name}</h2>
            </article>
            <button
              onClick={() => onClick(dragon)}
              className="Card-Edit-Button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
              </svg>
            </button>
          </div>
          <div className="Card-ImageDragon">
            {imageUrl ? (
              <img
                className="dragon-photo"
                src={imageUrl}
                alt={`Dragon${dragon.id}`}
              />
            ) : (
              <p>No photo available</p>
            )}

            <div className="Card-DragonInfoRow">
              <h2 className="Card-DragonInfoRow-name">{dragon.name}</h2>
              <p>Tipo: {dragon.type}</p>
              <p>
                História:{""}
                <ExpandableText text={dragon.histories} maxCaracteres={80} />
              </p>
            </div>
          </div>
          <div className="Card-IconsRow">
            <LikeButton isLiked={isLiked} onClick={handleLikeClick} />
            <CommentButton onClick={handleCommentButtonClick} />
            <SharedButton />
            {showCommentBox && (
              <CommentPopUp
                dragonId={dragon.id}
                onCommentSubmit={handleCommentSubmit}
                onClose={() => setShowCommentBox(false)}
              />
            )}
          </div>
        </div>
        {comments.length > 0 && (
          <div className="Card-Comments-Row">
            <h3 className="Card-Comments-Title">Comentários</h3>
            {comments.map((comment, index) => (
              <div className="Card-Comments-divMain">
                <div className="Card-Comments-divIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="40"
                    viewBox="0 -960 960 960"
                    width="40"
                    fill="#680e81"
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                  </svg>
                </div>
                <div className="Card-Comments-divNames">
                  <p className="Card-Comments-Name">Anônimo</p>
                  <p key={index}>{comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default DragonCard;
