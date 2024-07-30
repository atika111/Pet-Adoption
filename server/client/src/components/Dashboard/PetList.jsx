import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PetModal from "./petModal";

function PetList({ pets }) {
  if (!Array.isArray(pets)) return;

  const [petId, setPetId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePet = (petId) => {
    console.log('in handlePet');
    setPetId(petId);
    setIsModalOpen(true);
  };
  return (
    <div>
      <h2>PetList</h2>
      <div className="petslist-container">
        <div>
          <ul>
            {pets.length !== 0 &&
              pets.map((pet) => (
                <li key={pet._id}>
                  <div onClick={() => handlePet(pet._id)}>
                    <h3>{pet.name}</h3>
                    <p>{pet.type}</p>
                    <img src={pet.picture} alt="dog picture" />
                  </div>
                </li>
              ))}
          </ul>
        </div>
        {isModalOpen && (
          <PetModal
            data={{ ...{ pets, petId, isModalOpen, setIsModalOpen } }}
          />
        )}
      </div>
    </div>
  );
}

export default PetList