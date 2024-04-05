export const convertArrayToObject = (input) => {
  if (Array.isArray(input)) {
    const user = { ...input };
    return user[0];
  } else if (typeof input === "object" && input !== null) {
    return { ...input };
  } else {
    return input;
  }
};

function setCookie(key, value, expirationDays) {
  const isExpiration = expirationDays;
  let expires;
  if (isExpiration) {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    expires = "expires=" + date.toUTCString();
  }

  const serializedValue = JSON.stringify(value);

  document.cookie = isExpiration
    ? key + "=" + serializedValue + ";" + expires + ";path=/"
    : key + "=" + serializedValue + ";";
}

const utilities = {
  convertArrayToObject,
  setCookie,
};

export default utilities;
