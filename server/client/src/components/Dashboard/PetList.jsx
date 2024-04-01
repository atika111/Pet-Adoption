import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PetModal from "./petModal";

export default function PetList({ pets }) {
  if (!Array.isArray(pets)) return;

  const [petId, setPetId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handlePet = (petId) => {
    setPetId(petId);
    setIsModalOpen(true);
  };
  return (
    <div>
      <h2>PetList</h2>
      <div className="petslist-container">
        <div pet-card>
          <ul>
            {pets.length !== 0 &&
              pets.map((pet) => (
                <li key={pet.id}>
                  <div onClick={() => handlePet(pet._id)}>
                    <h3>{pet.name}</h3>
                    <p>{pet.type}</p>
                    <img src={pet.picture} alt="dog picture" />
                  </div>
                </li>
              ))}
          </ul>
        </div>
        {isModalOpen && <PetModal data={{...{pets, petId,  isModalOpen, setIsModalOpen}}} />}
      </div>
    </div>
  );
}
