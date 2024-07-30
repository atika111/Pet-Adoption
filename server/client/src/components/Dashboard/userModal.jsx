import { useState, useEffect } from "react";
import { getPetsByUserId } from "../../api/pet";
import "./dashboard.css";
import style from "../../utility.module.css";

const UserModal = ({userModal }) => {
  const [modal, setModal] = useState({
    userInfo: {},
    pets: null,
  });
  const [isOpen, setIsOpen] = useState({
    modalPets: false,
  });
  const [error, setError] = useState('')


  const handlePets = async (e) => {
    e.stopPropagation();

    try {
      setError('')
      const pets = await getPetsByUserId(modal.userInfo._id);
    setModal((prevPets) => ({ ...prevPets, pets: pets }));
    setIsOpen({ modalPets: true });

    console.log("pets: ", pets);
    } catch (error) {
      setError('Could not get pets')
      console.log('Could not get pets: ', error);
      
    }
  };

  const onClose = (e) => {
    const id = e.target.id;
    console.log("id: ", id);
    switch (id) {
      case "modalUser":
        userModal(false);
        break;
      case "modalPets":
        setIsOpen({ modalPets: !isOpen.modalPets });
        break;

      default:
        break;
    }
  };
  // useEffect(() => {
  //   const data = users.users.find((userData) => userData._id === users.userId);

  //   if (data) {
  //     console.log("user: ", users);
  //     console.log("data: ", data);
  //     setModal((prevUser) => ({ ...prevUser, userInfo: data }));
  //   }
  // }, [users]);


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          id="modalUser"
          onClick={(e) => onClose(e)}
          className="close-button"
        >
          ×
        </button>
        <h2>User Information</h2>

        <img src={modal.userInfo.picture} alt="userImg" />
        <h3>{modal.userInfo.firstName}</h3>
        <p>{modal.userInfo.roles}</p>
        <p>{modal.userInfo.phoneNumber}</p>
        <p onClick={(e) => handlePets(e)}>{`Pets (${modal.userInfo.pets?.length})`}</p>
        <p>{error}</p>
      </div>
      <div className="owned-pets__scroll">
        {isOpen.modalPets && (
          <div className="user-modal__owned-pets">
            <button id="modalPets" className="lose-button" onClick={onClose}>
              x
            </button>
            {modal.pets.ownedPets?.map((pet) => (
              <div key={pet._id} className="owned-pets">
                <img src={pet.picture}></img>
                <p>{pet.name}</p>
                {/* <p>Breed: {pet.breed}</p>/ */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
