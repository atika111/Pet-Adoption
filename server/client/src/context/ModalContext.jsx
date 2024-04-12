import React, { useReducer, useContext, createContext } from "react";
import { initialState, modalReducer } from "../Reducers/modalReducer";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (content) => {
    console.log('content: ', content);
    dispatch({ type: "OPEN_MODAL", payload: content });
  };
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  return (
    <ModalContext.Provider value={{ ...state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
