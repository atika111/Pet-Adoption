import React, { useEffect, useState } from "react";
import style from "../../utility.module.css";
import "./dashboard.css";
import { editPet } from "../../api/pet";
import { useUser } from "../../context/UserContext";
import { usePet } from "../../context/PetContext";

function PetModal({ data, updatePetsList }) {
  const { isModalOpen, setIsModalOpen } = data;

  const { fetchUsersData } = useUser();
  const { fetchPetsData } = usePet();

  const [pet, setPet] = useState({});
  const [editNewPet, setEditNewPet] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLading, setIsLading] = useState(false);

  const onClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleUpDatePet = async () => {
    try {
      setError("");
      setSuccessMessage("");
      setIsLading(true);

      const updatedPet = await editPet(editNewPet, pet._id);
      console.log("updatedPet: ", updatedPet);

      setSuccessMessage(updatedPet.data.message);
      refreshList()
    } catch (error) {
      console.log("Failed to update pet: ", error);
      setError("Failed to update pet");
    } finally {
      setIsLading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditNewPet((prevEditNewPet) => ({
      ...prevEditNewPet,
      [name]: value,
    }));
  };

  const refreshList = () => {
    fetchPetsData()
    fetchUsersData()
  }

  useEffect(() => {
    const pet = data.pets.find((pet) => pet._id === data.petId);
    setPet(pet);
    setEditNewPet({
      name: pet?.name || "",
      type: pet?.type || "",
      height: pet?.height || "",
      weight: pet?.weight || "",
      color: pet?.color || "",
      bio: pet?.bio || "",
      hypoallergenic: pet?.hypoallergenic || "",
      dietaryRestrictions: pet?.dietaryRestrictions || "",
      breed: pet?.breed || "",
    });
  }, [data]);

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button id="modalUser" onClick={onClose} className="close-button">
              ×
            </button>
            <img
              className={`${style.image} card__image`}
              src={pet.picture || null}
              alt="Pet image"
            />

            <h1>
              <input
                onChange={handleInputChange}
                value={editNewPet?.name}
                type="text"
                name="name"
              />
            </h1>
            <h2>About</h2>
            <p>
              <span>Adoption status:</span> {pet?.adoptionStatus}
            </p>
            <p>
              <span>Type:</span>{" "}
              <input
                onChange={handleInputChange}
                value={editNewPet?.type}
                type="text"
                name="type"
              />
            </p>
            <p>
              <span>Height:</span>{" "}
              <input
                onChange={handleInputChange}
                value={editNewPet?.height}
                type="text"
                name="height"
              />
            </p>
            <p>
              <span>Weight:</span>{" "}
              <input
                onChange={handleInputChange}
                value={editNewPet?.weight}
                type="text"
                name="weight"
              />
            </p>
            <p>
              <span>Color:</span>{" "}
              <input
                onChange={handleInputChange}
                value={editNewPet?.color}
                type="text"
                name="color"
              />
            </p>
            <p>
              <span>Bio:</span>{" "}
              <textarea
                onChange={handleInputChange}
                value={editNewPet?.bio}
                type="text"
                name="bio"
              />
            </p>
            <p>
              <span>Hypoallergenic:</span>{" "}
              <input
                onChange={handleInputChange}
                value={editNewPet?.hypoallergenic}
                type="text"
                name="hypoallergenic"
                placeholder="Yes/No?"
              />
            </p>
            <p>
              <span>Dietary:</span> Restrictions{" "}
              <input
                onChange={handleInputChange}
                value={editNewPet?.dietaryRestrictions}
                type="text"
                name="dietaryRestrictions"
              />
            </p>
            <p>
              <span>Breed:</span>{" "}
              <input
                onChange={handleInputChange}
                value={editNewPet?.breed}
                type="text"
                name="breed"
              />
            </p>
            <button onClick={handleUpDatePet}>
              {isLading ? "Update..." : "Update"}
            </button>
            <p>{error || successMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PetModal;
