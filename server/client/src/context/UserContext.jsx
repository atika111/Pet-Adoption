import {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { fetchUser, getAllUsers, getUserById, login } from "../api/user";
import { initialState, userReducer } from "../Reducers/userReducer";
import utilities from "../utilitiesClient";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [userObj, setUserObj] = useState({});
  const [pets, setPets] = useState(null);
  const userId = "6609a04cf1f1fa3c21625986";
  const [users, setUsers] = useState([]);
  const [keysInput, setKeysInput] = useState({});

  const [state, dispatch] = useReducer(userReducer, initialState);

  const defaultImage =
    "https://res.cloudinary.com/dwiiz8ilo/image/upload/v1711952587/Screenshot_2024-04-01_092244_qcmxqx.png";

  const fetchUsersData = async () => {
    const users = await getAllUsers();
    setUsers(users);
    return users
  };

  const fetchCurrentUser = async () => {
    try {
      const user = await fetchUser();      
      setUser(user)
      setIsLogin(true)
    } catch (error) {
      // utilities.setCookie("user", user)
      console.log("error: ", error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        isLogin,
        setIsLogin,
        user,
        setUser,
        pets,
        setPets,
        userObj,
        setUserObj,
        users,
        fetchUsersData,
        state,
        dispatch,
        defaultImage,
        fetchCurrentUser,
        keysInput, setKeysInput
      
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  return useContext(UserContext);
};

export { useUser, UserProvider };
