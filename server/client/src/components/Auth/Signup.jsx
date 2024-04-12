import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { signup } from "../../api/user";
import { useNavigate } from "react-router-dom";
import UploadImage from "./UploadImage";
import { useModal } from "../../context/ModalContext";
import utilities from "../../utilitiesClient";
import { actionTypes } from "../../Reducers/userReducer";

function Signup({showSignup}) {
  console.log('showSignup: ', showSignup);
  const { state, dispatch, defaultImage } = useUser();

  const navigate = useNavigate();

  const handleChange = (e) => {
    utilities.handleInputChange({
      ...{ actionTypes, dispatch, target: e.target },
    });
  };
  const handleAppendForm = () => {
    const newUser = new FormData();

    for (const key in state.dynamicFields) {
      newUser.append(key, state.dynamicFields[key]);
    }
    if (!state.dynamicFields.avatarImage) {
      newUser.append("avatarImage", state.avatarImage || defaultImage);
    }
    return newUser;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("e.target: ", e.target);

    utilities.handleSaveStateKeysForCleaningInput({
      ...{ target: e.target, actionTypes, dispatch },
    });
    dispatch({ type: "SUCCESS_MESSAGE", successMessage: "" });
    dispatch({ type: "SET_LOADING", isLoading: true });

    const newUser = handleAppendForm();
    try {
      utilities.resetStatesAndStartNew({ ...{ dispatch, actionTypes } });

      const { data } = await signup(newUser);

      utilities.handleSuccessResponse({
        ...{ success: data?.message, dispatch, actionTypes },
      });
    } catch (error) {
      console.log("error: ", error);
      utilities.handleErrorResponse({
        ...{ error: error?.message, dispatch, actionTypes },
      });
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false });
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
          id="email"
          placeholder="Email"
          value={state.dynamicFields.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={state.dynamicFields.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="repPassword"
          id="repPassword"
          placeholder="Confirm Password"
          value={state.dynamicFields.repPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          value={state.dynamicFields.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          value={state.dynamicFields.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nickname"
          id="nickname"
          placeholder="Nickname"
          value={state.dynamicFields.nickname}
          onChange={handleChange}
          required
        />
        <input
          type="address"
          name="address"
          id="address"
          placeholder="Address"
          value={state.dynamicFields.address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone"
          value={state.dynamicFields.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {state.isLoading ? "Sign Up..." : "Sign Up"}
        </button>
        {state.isError && <p>"Error:"{state.error}</p>}
        <p>{state.successMessage}</p>
      </form>
    </div>
  );
}

export default Signup;
