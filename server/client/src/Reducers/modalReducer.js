export const initialState = {
  isOpen: false,
  modalContent: null,
};

export const actionTypes = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
};


export const modalReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return { isOpen: true, modalContent: action.payload };
    case actionTypes.CLOSE_MODAL:
      return { isOpen: false, modalContent: null };
    default:
      return state;
  }
};
