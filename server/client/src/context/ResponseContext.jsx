import { createContext, useContext, useReducer } from "react";
import { initialState, responseReducer } from "../Reducers/responseReducer";

const ResponseContext = createContext();

export function ResponseProvider({children}) {
  const [state, dispatch] = useReducer(responseReducer, initialState);
  return (
    <ResponseContext.Provider value={{ state, dispatch }}>
      {children}
    </ResponseContext.Provider>
  );
}

const useResponse = () => {
  return useContext(ResponseContext);
};

export default useResponse;
