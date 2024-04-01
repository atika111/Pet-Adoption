

export const convertArrayToObject = (input) => {
  if (Array.isArray(input)) {
    const user = { ...input }
    return user[0]
  } else if (typeof input === "object" && input !== null) {
    return { ...input };
  } else {
    return input;
  }
};

const utilities = {
  convertArrayToObject
};

export default utilities