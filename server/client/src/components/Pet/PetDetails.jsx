import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  adoptOrFosterPet,
  deleteSavedPet,
  getPetsByUserId,
  returnPet,
  savePet,
} from "../../api/pet";
import style from "../../utility.module.css";
import "./pet.css";
import { useUser } from "../../context/UserContext";
import { usePet } from "../../context/PetContext";
import Cookies from "js-cookie";

function PetDetails() {
  const [adoptionStatus, setAdoptionStatus] = useState("");

  const { petId } = useParams();

  const {
    petDetail,
    fetchPetData,
    setPets,
    setPetDetail,
    isSaved,
    setIsSaved,
  } = usePet();
  const { user, isLogin } = useUser();

  const checkIfSavedPet = () => {
    const usersPets = Cookies.get("usersPets");
    if (usersPets) {
      const { savedPets } = JSON.parse(usersPets);
      console.log("parsedSavedPets: ", savedPets);
      const isSaved = savedPets.some((savedPet) => savedPet._id === petId);
      setIsSaved(isSaved);
    } else {
      setIsSaved(false);
    }
  };

  const handleSavePets = async () => {
    const savedPet = await savePet(user.userId, petId);
    const pets = await getPetsByUserId(user.userId);
    setPets(pets);
    const serializedUserPets = JSON.stringify(pets);
    Cookies.set("usersPets", serializedUserPets);
    setIsSaved(true);
  };

  const handleUnsave = async () => {
    const unSavedPet = await deleteSavedPet(user.userId, petId);
    const pets = await getPetsByUserId(user.userId);
    setPets(pets);
    const serializedUserPets = JSON.stringify(pets);
    Cookies.set("usersPets", serializedUserPets);
    setIsSaved(false);
  };

  const handleReturnPet = async () => {
    const { pet } = await returnPet(user.userId, petId);
    setAdoptionStatus(pet.adoptionStatus);
    setPetDetail(pet);
  };

  const handleAdoptOrFosterPet = async (e) => {
    const status = e.target.id;

    const adoptionData = {
      userId: user.userId,
      petId,
      adoptionStatus: status,
      currentAdoptionStatus: petDetail.status,
      petOwnerId: petDetail.owner,
    };

    try {
      const updatedPet = await adoptOrFosterPet(adoptionData);
      console.log(updatedPet.pet);
      // setAdoptionStatus(updatedPet.pet.status);
      setPetDetail(updatedPet.pet);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPetData(petId);
    };

    if (user && petId) {
      fetchData();
    }
  }, [user, petId]);

  useEffect(() => {
    if (isLogin) {
      checkIfSavedPet();
    }
  }, [isLogin, petId]);

  return (
    // display user data
    <div>
      <div className="card">
        {petDetail && (
          <>
            <img
              className={`${style.image} card__image`}
              src={petDetail.picture || null}
              alt="Pet image"
            />

            <h1>{petDetail?.name}</h1>
            <h2>About</h2>
            <p>
              <span>Adoption status:</span> {petDetail.adoptionStatus}
            </p>
            <p>
              <span>Type:</span> {petDetail?.type}
            </p>
            <p>
              <span>Height:</span> {petDetail?.height}
            </p>
            <p>
              <span>Weight:</span> {petDetail?.weight}
            </p>
            <p>
              <span>Color:</span> {petDetail?.color}
            </p>
            <p>
              <span>Bio:</span> {petDetail?.bio}
            </p>
            <p>
              <span>Hypoallergenic:</span> {petDetail?.hypoallergenic}
            </p>
            <p>
              <span>Dietary:</span> Restrictions{" "}
              {petDetail?.dietaryRestrictions}
            </p>
            <p>
              <span>Breed:</span> {petDetail?.breed}
            </p>
          </>
        )}
      </div>

      {isLogin && (
        <>
          {(petDetail.adoptionStatus === "available" && (
            <>
              <button id="foster" onClick={(e) => handleAdoptOrFosterPet(e)}>
                Foster
              </button>
              <button id="adopt" onClick={(e) => handleAdoptOrFosterPet(e)}>
                Adopt
              </button>
            </>
          )) ||
            (petDetail.adoptionStatus !== "adopt" && (
              <>
                <button id="adopt" onClick={(e) => handleAdoptOrFosterPet(e)}>
                  Adopt
                </button>
                {petDetail.owner === user.userId && (
                  <button onClick={handleReturnPet}>Return</button>
                )}
              </>
            )) ||
            (petDetail.adoptionStatus !== "foster" &&
              petDetail.adoptionStatus !== "available" && (
                <>
                  {petDetail.owner === user.userId && (
                    <button onClick={handleReturnPet}>Return</button>
                  )}
                </>
              )) ||
            (petDetail.adoptionStatus === "unknown" && (
              <p>There is a problem with the card status</p>
            ))}

          {isSaved ? (
            <button onClick={handleUnsave}>Unsave</button>
          ) : (
            <button onClick={handleSavePets}>Save</button>
          )}
        </>
      )}
    </div>
  );
}

export default PetDetails;
