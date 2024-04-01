import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Card, Input } from "@mui/material";
import axios from "axios";
import "../Profile/profile.css";
import { useUser } from "../../context/UserContext";

function ProfileSettings() {
  const [profileData, setProfileData] = useState({});

  const { state, dispatch, user } = useUser();

  const handleChangeData = (e) => {
    const { id, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];

    setProfileData((prevData) => ({
      ...prevData,
      profilePicture: file,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const requestData = {};

    formData.forEach((value, key) => {
      if(value !== "" ) {
        console.log('value, key: ', value, key);
        requestData[key] = value;
      }
    });

    try {
      dispatch({ type: "SET_IS_ERROR", isError: false });
      dispatch({ type: "IS_LOADING", isLoading: true });
console.log(user.userId);
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/user/user/${user.userId}`,
        requestData
      );
      dispatch({ type: "SUCCESS_MESSAGE", successMessage: res.data.message });

      console.log("data: ", res.data);
    } catch (error) {
      dispatch({ type: "SET_IS_ERROR", isError: true });
      console.log("error: ", error);
      console.log("error.response.data: ", error.response.data);
      console.log("error.response.status: ", error.response.status);
      console.log("error.response.headers: ", error.response.headers);
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false });
      console.log(state.successMessage);
    }
  };
  useEffect(() => {
    return () => {
      dispatch({ type: "SUCCESS_MESSAGE", successMessage: "" });
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <Card className="profile" sx={{}}>
          <h1>ProfileSettings</h1>
          <Input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={(e) => handleFileChange(e)}
          />
          <TextField
            onChange={(e) => handleChangeData(e)}
            value={profileData?.firstName}
            label="First Name"
            id="firstName"
            name="firstName"
          />
          <TextField
            onChange={(e) => handleChangeData(e)}
            value={profileData?.lastName}
            label="Last Name"
            id="lastName"
            name="lastName"
          />
          <TextField
            onChange={(e) => handleChangeData(e)}
            value={profileData?.email}
            label="Email"
            id="email"
            name="email"
          />
          <TextField
            onChange={(e) => handleChangeData(e)}
            value={profileData?.phone}
            label="Phone"
            type="phone"
            id="phone"
            name="phone"
          />
          <TextField
            onChange={(e) => handleChangeData(e)}
            value={profileData?.password}
            label="Password"
            id="password"
            name="password"
          />
          <TextField
            onChange={(e) => handleChangeData(e)}
            value={profileData?.shortBio}
            sx={{ width: "300px", height: "500px" }}
            aria-label="Demo input"
            multiline
            placeholder="Type something…"
            label="Short bio"
            id="shortBio"
            name="shortBio"
          />
          <button type="submit" sx={{ background: "black" }}>
            {state.isLoading ? "Submit..." : "Submit"}
          </button>
          <span>{state.isError ? state.error : state.successMessage}</span>
        </Card>
      </form>
    </div>
  );
}

export default ProfileSettings;
