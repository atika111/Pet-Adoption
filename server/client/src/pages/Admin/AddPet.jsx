import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Card, Input } from "@mui/material";
import axios from "axios";
import { addPet } from "../../api/pet";
import { useUser } from "../../context/UserContext";
import UploadImage from "../../components/Auth/UploadImage";
import { useEffect } from "react";
import utilities from "../../utilitiesClient";
import { actionTypes } from "../../Reducers/userReducer";

function AddPet() {
  const [newPet, setNewPet] = useState({
    adoptionStatus: "available",
    name: "",
    bio: "",
    breed: "",
    color: "",
    dietaryRestrictions: "",
    height: "",
    hypoallergenic: true,
    name: "",
    picture: null,
    type: "",
    weight: "",
  });

  const { state, dispatch } = useUser();

  const handleFileChange = (image) => {
    console.log("image: ", image);

    setNewPet((prevData) => ({
      ...prevData,
      picture: image,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    utilities.handleSaveStateKeysForCleaningInput({
      ...{ target: event.target, actionTypes, dispatch },
    });

    try {
      utilities.resetStatesAndStartNew({ ...{ dispatch, actionTypes } });

      const formData = new FormData();
      for (let key in newPet) {
        formData.append(key, newPet[key]);
      }

      const addedPet = await addPet(formData);

      utilities.handleSuccessResponse({
        ...{ success: addedPet?.message, dispatch, actionTypes },
      });
    } catch (error) {
      utilities.handleErrorResponse({
        ...{ error: error?.message, dispatch, actionTypes },
      });
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    return () => {
      const isLoading = false;

      utilities.resetStatesAndStartNew({
        ...{ isLoading, dispatch, actionTypes },
      });
      utilities.handleCleanInput({
        ...{ FormDataKeys: state.FormDataKeys, actionTypes, dispatch },
      });
    };
  }, []);
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <Card className="profile" sx={{}}>
          <h1>New Pet</h1>

          <UploadImage setAvatarImage={(image) => handleFileChange(image)} />

          {Object.entries(newPet).map(([key, value]) => {
            if (key === "picture") return null;

            return (
              <TextField
                key={key}
                value={value}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                id={key}
                name={key}
                onChange={(e) =>
                  setNewPet({ ...newPet, [key]: e.target.value })
                }
              />
            );
          })}
          <button type="submit" sx={{ background: "black" }}>
            {state.isLoading ? "Submit..." : "Submit"}
          </button>
          <p>{state.isError ? state.error : state.successMessage}</p>
        </Card>
      </form>
    </div>
  );
}

export default AddPet;
