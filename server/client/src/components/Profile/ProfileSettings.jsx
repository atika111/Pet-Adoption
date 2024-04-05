import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Card, Input } from "@mui/material";
import axios from "axios";
import "../Profile/profile.css";
import { useUser } from "../../context/UserContext";
import UploadImage from "../Auth/UploadImage";
import Cookies from "js-cookie";

function ProfileSettings() {
  const [profileData, setProfileData] = useState({});

  const { state, dispatch, user, setUser } = useUser();

  const useR = JSON.parse(Cookies.get("user"));
  console.log('useR: ', useR);

  const handleChangeData = (e) => {
    const { id, value } = e.target;
    if (id === "phoneNumber" && isNaN(value)) return;

    setProfileData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (image) => {
    console.log("image: ", image);
    // console.log('e): ', e);
    // const fileInput = e.target;
    // const file = fileInput.files[0];
    setProfileData((prevData) => ({
      ...prevData,
      avatarImage: image,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const requestData = {};

    formData.forEach((value, key) => {
      if (value !== "" || (key === "avatarImage" && value.size !== 0)) {
        requestData[key] = value;
      }
    });
    try {
      dispatch({ type: "SET_IS_ERROR", isError: false });
      dispatch({ type: "IS_LOADING", isLoading: true });
      dispatch({ type: "SET_ERROR" });

      console.log(user.userId);
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/user/user/${useR.userId}`,
        requestData
      );
      dispatch({ type: "SUCCESS_MESSAGE", successMessage: res.data.message });
      if (res.data.updatedUser) {
      const serializedUser = JSON.stringify(res.data.updatedUser);
        Cookies.set("user", serializedUser);
        setUser(res.data.updatedUser);
        console.log("data: ", res.data.updatedUser);
      }
    } catch (error) {
      console.log("error: ", error);
      dispatch({ type: "SET_IS_ERROR", isError: true });
      dispatch({ type: "SET_ERROR", error: error.response.data?.message });
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
          <UploadImage setAvatarImage={(image) => handleFileChange(image)} />

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
            value={profileData?.phoneNumber}
            label="Phone"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
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
