import { createContext, useContext, useState } from "react";
import { getAllPets, getPetById, getPetsByUserId } from "../api/pet";

const petContext = createContext();

function PetProvider({ children }) {
  const [petDetail, setPetDetail] = useState({});
  const [pets, setPets] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const fetchPetData = async (petId) => {
    try {
      const data = await getPetById(petId);
      setPetDetail(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchPetsData = async () => {
    const pets = await getAllPets();
    console.log("pets: ", pets);
    setPets(pets);
  };

  const fetchPetsById = async (userId) => {
    try {
      const data = await getPetsByUserId(userId);
      console.log("data: ", data);
      setPets(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <petContext.Provider
      value={{
        petDetail,
        fetchPetData,
        fetchPetsData,
        fetchPetsById,
        pets,
        setPets,
        setPetDetail,
        isSaved,
        setIsSaved,
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
