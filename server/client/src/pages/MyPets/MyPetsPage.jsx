import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import style from "../../utility.module.css";
import { useNavigate } from "react-router-dom";
import { usePet } from "../../context/PetContext";
import Cookies from "js-cookie";

function MyPetsPage() {
  const [searchType, setSearchType] = useState(true);

  const { user } = useUser();
  
const pets = JSON.parse(Cookies.get("usersPets"))

  const { ownedPets, savedPets, savedLength, ownedLength } = pets;

  const petsList = searchType ? savedPets : ownedPets

  const navigate = useNavigate()

  const handleSearchState = () => {
    setSearchType(!searchType);
  };

  const handleClickedCard = (petId) => {
      
      navigate(`/petDetails/${petId}`)
};


  return (
    <div>
      {searchType ? (
        <>
          <h1>{`My Favorites${
            savedLength
              ? `(${savedLength})`
              : " You currently do not have any saved pets"
          }`}</h1>
          <button onClick={handleSearchState}>Saved pets</button>
        </>
      ) : (
        <>
          <h1>{`My Own: ${
            ownedLength
              ? `(${ownedLength})`
              : " You currently do not have any Own pets"
          }`}</h1>
          <button onClick={handleSearchState}>Owned pets</button>
        </>
      )}
      <div>
        <ul>
          {petsList.map((pet) => (
                <li onClick={() => handleClickedCard(pet._id)} key={pet._id}>
                  <img
                    className={style.image}
                    src={pet?.picture || null}
                    alt="Pet Img"
                  />
                  <h2>{pet?.name}</h2>
                  <h3>{pet.breed}</h3>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default MyPetsPage;

/**] My Pets Page

[] (Can toggle between pets and saved pets)
[] Components (pets and same for saved pets):
[] Text displaying - you currently do not own or foster any pets. (if they don't have any pets)
[] Cards displaying all the pets the user owns/fosters */
