import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  adoptOrFosterPet,
  deleteSavedPet,
  returnPet,
  savePet,
} from "../../api/pet";
import style from "../../utility.module.css";
import "./pet.css";
import { useUser } from "../../context/UserContext";
import { usePet } from "../../context/PetContext";

function PetDetails() {
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const { petId } = useParams();

  const {petDetail, fetchPetData} = usePet()
  const { userObj, isLogin } = useUser();

  const checkStatusUsersPetsOwned = () => {
    let adoptionStatus;

    switch (petDetail.adoptionStatus) {
      case "available":
        adoptionStatus = "available";
        break;
      case "foster":
        adoptionStatus = "adopt";
        break;
      case "adopt":
        adoptionStatus = "foster";
        break;

      default:
        adoptionStatus =
          userObj && petDetail.owner === userObj.userId ? "return" : "unknown";
        break;
    }
    console.log("adoptionStatus: ", adoptionStatus);
    return adoptionStatus;
  };

  const checkIfSavedPet = () => {
    let isSaved = userObj.savedPets?.includes(petId);

    setIsSaved(isSaved);
  };

  const handleSavePets = async () => {
    const savedPet = await savePet(userObj.userId, petId);
    setIsSaved(true);
  };

  const handleUnsave = async () => {
    const unSavedPet = await deleteSavedPet(userObj.userId, petId);
    setIsSaved(false);
    // console.log("unSavedPet: ", unSavedPet);
  };

  const handleReturnPet = async () => {
    const { pet } = await returnPet(userObj.userId, petId);

    setAdoptionStatus(pet.adoptionStatus);
  };


  const handleAdoptOrFosterPet = async (e) => {
    const status = e.target.id;

    console.log('userObj.userId: ', userObj.userId);
    const adoptionData = {
      userId: userObj.userId,
      petId,
      adoptionStatus: status,
    };
    const fosterOrAdoptPet = await adoptOrFosterPet(adoptionData);

    console.log("fosterOrAdoptPet?.status: ", fosterOrAdoptPet?.status);
    setAdoptionStatus(fosterOrAdoptPet?.status);

    if (fosterOrAdoptPet?.status === adoptionStatus) {
    } else {
      console.log("Same..............");
    }
  };

  useEffect(() => {
    //   fetch pet data
    fetchPetData(petId);
    setAdoptionStatus(petDetail.adoptionStatus);
  }, [userObj, petId]);

  useEffect(() => {
    if (isLogin) {
      const updatedAdoptionStatus = checkStatusUsersPetsOwned();
      setAdoptionStatus(updatedAdoptionStatus);
      checkIfSavedPet();
    }
  }, [petDetail]);

  useEffect(() => {}, [adoptionStatus]);

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
              <span>Adoption status:</span> {adoptionStatus}
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
          {(adoptionStatus === "available" && (
            <>
              <button id="foster" onClick={(e) => handleAdoptOrFosterPet(e)}>
                Foster
              </button>
              <button id="adopt" onClick={(e) => handleAdoptOrFosterPet(e)}>
                Adopt
              </button>
            </>
          )) ||
            (adoptionStatus !== "adopt" && (
              <>
                <button id="adopt" onClick={(e) => handleAdoptOrFosterPet(e)}>
                  Adopt
                </button>
                <button onClick={handleReturnPet}>Return</button>
              </>
            )) ||
            (adoptionStatus !== "foster" && (
              <>
                {/* <button id="foster" onClick={(e) => handleAdoptOrFosterPet(e)}>
                  Foster
                </button> */}
                <button onClick={handleReturnPet}>Return</button>
              </>
            )) ||
            (adoptionStatus === "unknown" && (
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
