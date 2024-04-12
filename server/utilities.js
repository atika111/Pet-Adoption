function unwrapObjects(input) {
  if (Array.isArray(input)) {
    return { ...input };
  } else if (typeof input === "object" && input !== null) {
    let petsObj = {};
    for (const key in input) {
      petsObj[key] = { ...input[key] };
      console.log("petsObj[key]: ", petsObj[key]);
    }
    return petsObj;
  } else {
    return input;
  }
}

module.exports = {
  unwrapObjects,
};
    