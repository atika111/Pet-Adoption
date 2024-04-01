import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Card, Input } from "@mui/material";
import axios from "axios";
import { addPet } from "../../api/pet";
import { useUser } from "../../context/UserContext";

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

  const handleFileChange = (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];

    setNewPet((prevData) => ({
      ...prevData,
      picture: file,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch({ type: "IS_LOADING", isLoading: true });
      dispatch({ type: "SET_IS_ERROR", isError: false });
      dispatch({ type: "RESET_ERROR" });
      dispatch({ type: "SUCCESS_MESSAGE", successMessage: "" });

      const formData = new FormData();
      for (let key in newPet) {
        formData.append(key, newPet[key]);
      }

      const addedPet = await addPet(formData);
      // console.log('addedPet: ', addedPet);
      dispatch({
        type: "SUCCESS_MESSAGE",
        successMessage: "Successfully Added a Pet",
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error.message });
      dispatch({ type: "SET_IS_ERROR", isError: true });
      console.log("error: ", error);
    } finally {
      dispatch({ type: "IS_LOADING", isLoading: false });
    }
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <Card className="profile" sx={{}}>
          <h1>New Pet</h1>
          <Input
            type="file"
            id="petImg"
            name="picture"
            onChange={(e) => handleFileChange(e)}
          />
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
