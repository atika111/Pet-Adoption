import axios from "axios";

import { useUser } from "../context/UserContext";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: serverUrl,
});

const signup = async (newUser) => {
  // if(newUsers)
  try {
    const data = await api.post(`${serverUrl}/user/signup`, newUser);

    return data;
  } catch (error) {
    console.log("error: ", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data?.error);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};


const login = async (email, password) => {
  try {
    const data  = await api.post(`${serverUrl}/user/login`, {
      email,
      password,
      // withCredentials: true 
    });
    console.log('data: ', data);
    return data;
  } catch (error) {
    console.log("Hiii");
    throw new Error("An error occurred during login");
  }
};



const getAllUsers = async () => {
  try {
    const { data } = await api(`${serverUrl}/user/users`);

    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const getUserById = async () => {
  const { userId } = useUser();

  const { data } = await api.get(`${serverUrl}/user/user/${userId}`);
  console.log("userAPI : ", data);
};

const updateUser = async () => {
  const a = await api();
};

const deleteUser = async () => {
  const a = await api();
};

export { signup, login, getAllUsers, getUserById, updateUser, deleteUser };
