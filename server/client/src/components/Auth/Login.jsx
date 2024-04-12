import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import { getPetsByUserId } from "../../api/pet";
import utilities from "../../utilitiesClient";
import { useModal } from "../../context/ModalContext";
import { actionTypes } from "../../Reducers/userReducer";

function Login({ showSignup }) {
  console.log("showSignup: ", showSignup);
  const {
    setIsLogin,
    setUser,
    setPets,
    setUserObj,
    fetchUsersData,
    state,
    dispatch,
  } = useUser();

  const { closeModal } = useModal();

  const navigate = useNavigate();

  const fetchCurrentUserData = async (data) => {
    const pets = await getPetsByUserId(data.userId);
    const users = await fetchUsersData();
    const userData = {
      usersPets: pets,
      users,
      user: data,
      token: data.token,
    };
    return userData;
  };

  const setCurrentUserData = (userData) => {
    const { pets, user } = userData;
    setUserObj(utilities.convertArrayToObject(user));
    setUser(user);
    setPets(pets);
    setIsLogin(true);
  };

  const setCookies = (userData) => {
    console.log('userData: ', userData);
    for (const key in userData) {
      utilities.setCookie(key, userData[key]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    utilities.handleSaveStateKeysForCleaningInput({
      ...{ target: e.target, actionTypes, dispatch },
    });

    try {
      utilities.resetStatesAndStartNew({ ...{ dispatch, actionTypes } });
      const { data } = await login(
        state.dynamicFields.email,
        state.dynamicFields.password
      );

      const userData = await fetchCurrentUserData(data);

      utilities.handleSuccessResponse({
        ...{ success: data?.message, dispatch, actionTypes },
      });
      closeModal();
      setCurrentUserData(userData);
      setCookies(userData);
    } catch (error) {
      console.log("error: ", error);

      utilities.handleErrorResponse({
        ...{ error: error?.message, dispatch, actionTypes },
      });
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
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
    <div className="login">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={state.dynamicFields?.email}
          onChange={(e) =>
            utilities.handleInputChange({
              ...{ actionTypes, dispatch, target: e.target },
            })
          }
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.dynamicFields?.password}
          onChange={(e) =>
            utilities.handleInputChange({
              ...{ actionTypes, dispatch, target: e.target },
            })
          }
          required
        />
        {state?.isError ? (
          <p className="error">{state.error}</p>
        ) : (
          <p className="success">{state.successMessage}</p>
        )}
        <button type="submit">{state.isLoading ? "Login..." : "Login"}</button>
      </form>
    </div>
  );
}

export default Login;
