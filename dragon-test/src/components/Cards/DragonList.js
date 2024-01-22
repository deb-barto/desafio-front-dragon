import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

import DragonCard from "./DrangonCard/DragonCard"
import PopUpEdit from "./PopUpEdit/PopUpEdit"
import PopUpRegister from "./PopUpRegister/PopUpRegister"

import "./index.scss"

const DragonList = () => {
  const [dragons, setDragons] = useState([])
  const { isAuthenticated } = useAuth0()
  const [clientId] = useState("cGwNrV7VFY0H8dzHSPArh5HBWK9UCN_acFydNNYPsWA")
  const [dragonPhotos, setDragonPhotos] = useState([])
  const [selectedDragon, setSelectedDragon] = useState(null)
  const [isAddingDragon, setIsAddingDragon] = useState(false)

  const memoizedFetchDragons = useCallback(() => {
    const fetchDragons = async () => {
      try {
        const response = await axios.get(
          "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon"
        );
        const sortedDragons = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setDragons(sortedDragons)
      } catch (error) {
        console.error("Error fetching dragon data:", error)
      }
    }

    fetchDragons()
  }, [])

  useEffect(() => {
    memoizedFetchDragons()
  }, [memoizedFetchDragons])

  useEffect(() => {
    const fetchDragonPhotos = async () => {
      try {
        const url = `https://api.unsplash.com/search/photos?page=1&query=dragon&client_id=${clientId}`
        const response = await axios.get(url)
        setDragonPhotos(response.data.results)
      } catch (error) {
        console.error("Error fetching dragon photos:", error)
      }
    };

    fetchDragonPhotos()
  }, [clientId])

  const handleCardClick = (dragon) => {
    setSelectedDragon(dragon)
  };

  const handleClosePopup = () => {
    setSelectedDragon(null)
  };

  const handleAddDragon = async (newDragon) => {
    try {
      await axios.post(
        "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon",
        newDragon
      );
      memoizedFetchDragons()
    } catch (error) {
      console.error("Error adding dragon:", error)
    }
  };

  const handleAddDragonClick = () => {
    setIsAddingDragon(true);
  };

  return (
    isAuthenticated && (
      <div className="DragonList-Content">
        <div className=" DragonList-Container DragonList-ButtonAdd">
        <button
          onClick={handleAddDragonClick}
          className="DragonList-Button DragonList-Container"
        >
          Criar Dragão
        </button>
        </div>
        <div className="DragonList-Cards">
          <div className="Dragon-cards DragonList-Container">
            {dragons.map((dragon, index) => (
              <DragonCard
                key={dragon.id}
                dragon={dragon}
                photo={dragonPhotos[index]}
                onClick={() => handleCardClick(dragon)}
              />
            ))}
          </div>
        </div>

        {selectedDragon && (
          <PopUpEdit
            dragon={selectedDragon}
            photo={
              dragonPhotos[dragons.findIndex((d) => d.id === selectedDragon.id)]
            }
            onClose={handleClosePopup}
            fetchDragons={memoizedFetchDragons}
          />
        )}

        {isAddingDragon && (
          <PopUpRegister
            onClose={() => setIsAddingDragon(false)}
            onAddDragon={handleAddDragon}
          />
        )}
      </div>
    )
  );
};

export default DragonList
