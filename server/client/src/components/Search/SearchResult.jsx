import React from "react";
import { FcLike } from "react-icons/fc";
import "./search.css";
import style from "../../utility.module.css";
import { useNavigate } from "react-router-dom";
import { getPetsByUserId, savePet } from "../../api/pet";
import { useUser } from "../../context/UserContext";
import Cookies from "js-cookie";
import { usePet } from "../../context/PetContext";
import utilities from "../../utilitiesClient";

function SearchResult({ searchResult }) {
  const { setIsSaved, setPets } = usePet();

  const user = utilities.getCookie('user');

  const navigate = useNavigate();

  const handleSavePets = async (e, petId) => {
    e.stopPropagation();
    const savedPet = await savePet(user.userId, petId);
    const pets = await getPetsByUserId(user.userId);
    setPets(pets);
    utilities.setCookie("usersPets", pets);
  };

  const handleClickedPetCard = (petId) => {
    navigate(`/petDetails/${petId}`);
  };

  return (
    <div className="result-container">
      {Object.keys(searchResult).length > 0 &&
        searchResult.map((data) => (
          <div
            onClick={() => handleClickedPetCard(data._id)}
            key={data._id}
            className={`${style.card} card`}
          >
            <FcLike
              onClick={(e) => handleSavePets(e, data._id)}
              className={`${style.icon} card__icon-like`}
            />
            <img
              className={style.image}
              src={data.picture || null}
              alt="Pet Img"
            />
            <h2>{data?.name}</h2>
            <h3>{data.adoptionStatus}</h3>
          </div>
        ))}
    </div>
  );
}

export default SearchResult;
