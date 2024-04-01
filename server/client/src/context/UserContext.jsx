import {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { getAllUsers, getUserById } from "../api/user";
import { initialState, userReducer } from "../Reducers/userReducer";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [userObj, setUserObj] = useState({});
  const [pets, setPets] = useState(null);
  const userId = "6609a04cf1f1fa3c21625986";
  const [users, setUsers] = useState([]);

  const [state, dispatch] = useReducer(userReducer, initialState);

  const defaultImage = "https://res.cloudinary.com/dwiiz8ilo/image/upload/v1711952587/Screenshot_2024-04-01_092244_qcmxqx.png"

  const fetchUsersData = async () => {
    const users = await getAllUsers();

    setUsers(users);
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
