import { createContext, useContext, useState } from "react";
import { getAllPets, getPetById } from "../api/pet";

const petContext = createContext();

function PetProvider({ children }) {
  const [petDetail, setPetDetail] = useState({});
  const [pets, setPets] = useState([]);

  const fetchPetData = async (petId) => {
    const data = await getPetById(petId);
    setPetDetail(data);
  };

  const fetchPetsData = async () => {
    const pets = await getAllPets();
    setPets(pets);
  };
  return (
    <petContext.Provider
      value={{
        petDetail,
        fetchPetData,
        fetchPetsData,
        pets,
      }}
    >
      {children}
    </petContext.Provider>
  );
}

const usePet = () => {
  return useContext(petContext);
};

export { usePet, PetProvider };
