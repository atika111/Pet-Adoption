import React from "react";
import { useUser } from "../../context/UserContext";
import { signup } from "../../api/user";
import { useNavigate } from "react-router-dom";
import UploadImage from "./UploadImage";

function Signup() {
  const { state, dispatch, defaultImage} = useUser(); 

  
  const navigate = useNavigate();
  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSignupSuccess = (message) => {
    dispatch({ type: "SUCCESS_MESSAGE", successMessage: message });
    navigate("/login");
  };

  const handleSignupError = (error) => {
    dispatch({ type: "SET_IS_ERROR", isError: true });
    dispatch({ type: "SET_ERROR", error: error});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "SUCCESS_MESSAGE", successMessage: "" });
    dispatch({ type: "SET_LOADING", isLoading: true });

    const newUser = new FormData();

    newUser.append("email", state.email);
    newUser.append("password", state.password);
    newUser.append("repPassword", state.repPassword);
    newUser.append("firstName", state.firstName);
    newUser.append("lastName", state.lastName);
    newUser.append("nickName", state.nickname);
    newUser.append("address", state.address);
    newUser.append("phoneNumber", state.phoneNumber);
    newUser.append("role", state.role);
    newUser.append("avatarImage", state.avatarImage || defaultImage);

    console.log(" state.avatarImage: ", state.avatarImage);

    try {
      dispatch({ type: "RESET_ERROR", isError: false });
      dispatch({ type: "SET_ERROR", error: "" });

      const { data } = await signup(newUser);
      handleSignupSuccess(data.message);
    } catch (error) {
      handleSignupError(error?.message);

    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false });
    }
  };
  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <UploadImage
          setAvatarImage={(image) =>
            dispatch({
              type: "SET_FIELD",
              field: "avatarImage",
              value: image,
            })
          }
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="repPassword"
          placeholder="Confirm Password"
          value={state.repPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={state.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={state.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={state.nickname}
          onChange={handleChange}
          required
        />
        <input
          type="address"
          name="address"
          placeholder="Address"
          value={state.address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone"
          value={state.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
        <p>{state.error}</p>
        <p>{state.successMessage}</p>
      </form>
    </div>
  );
}

export default Signup;
