const Pet = require("../models/Pet");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { unwrapObjects } = require("../utilities");


const addPet = async (req, res) => {
  try {
    // Extract pet data from the request body
    const data = req.body;

    const petImage = req.file ? req.file.path : null;
    console.log('petImage: ', petImage);

    const newPet = new Pet({
      ...data,
      picture: petImage
    });

    const addedPet = await newPet.save();

    res.status(201).json(addedPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const editPet = asyncHandler(async (req, res) => {
  const petId = req.params.id;
  const {newEditPet} = req.body;

  if (!Object.keys(newEditPet).length > 0) {
    return res.status(400).json({ message: "No pet data to edit" });
  }

  const updatedPet = await Pet.findByIdAndUpdate(petId, newEditPet, {new: true});
  console.log('updatedPet: ', updatedPet);

  if (!updatedPet) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  res.status(201).json({ message: "Pet was created", newPet: updatedPet});
});
const getPetById = asyncHandler(async (req, res) => {
  const petId = req.params.id;

  const pet = await Pet.findById(petId);

  if (!pet) {
    return res.status(500).json({ message: "Internal server error" });
  }
  res.status(200).json(pet);
});
const getPets = asyncHandler(async (req, res) => {
  if (req.query.length) {
    res.status(400).json({ message: `No items to search for` });
  }
  // Parse query parameters

  const { searchTerm, adoptionStatus, height, weight, petType, name } = req.query;
  console.log('req.query: ', req.query);

  // Build the Mongoose query

  const query = {};
  if (adoptionStatus) query.adoptionStatus = adoptionStatus;
  if (height) query.height = height;
  if (weight) query.weight = weight;
  if (petType) query.type = new RegExp(petType, "i");
  if (name) query.name = new RegExp(name, "i");
  if (searchTerm) query.type = new RegExp(searchTerm, "i");
  console.log("query: ", query);

  // Query the database and select only necessary fields
  const pets = await Pet.find(query).select("type name adoptionStatus picture");

  // Handle empty result
  if (pets.length === 0) {
    res.status(404).json({ message: "Pet query not found" });
  }

  // Send the response

  res.status(200).json(pets);
});
const getAllPets = asyncHandler(async (req, res) => {
 

  const pets = await Pet.find({});

  if (!pets.length) {
    return res.status(404).json({ message: "Pets found" });
  }
  res.status(200).json(pets);
});
const adoptOrFosterPet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { adoptionStatus, userId, currentAdoptionStatus, petOwnerId } = req.body;
  

  if (!adoptionStatus || typeof adoptionStatus !== "string") {
    return res.status(400).json({ message: "Adoption status is required" });
  }

  if (petOwnerId !== userId && currentAdoptionStatus === "return") {
    return res.status(400).json({ message: "You are not the owner of the pet" });
  }



  console.log('userId: ', userId);
  const updatedPet = await Pet.findByIdAndUpdate(
    id,
    { adoptionStatus: adoptionStatus, owner: userId },
    { new: true }
  );

  if (!updatedPet) {
    return res.status(404).json({ message: "Pet not found" });
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { pets: updatedPet._id } },
    { new: true }
  );

  if (!updatedUser) {
    res.status(404).json({ message: "User not found" });
  }

  res
    .status(200)
    .json({ message: `The pet is now ${updatedPet.adoptionStatus}`, pet:updatedPet});
    
});

const returnPet = asyncHandler(async (req, res) => {
  const petId = req.params.id;
  console.log('petId: ', petId);
  const { userId } = req.body;
  console.log('userId: ', userId);

  // Find the pet by ID

  const pet = await Pet.findById(petId);

  if (!pet) {
    return res.status(404).json({ message: "Pet not found" });
  }
  // Check if the user is the owner of the pet

  if (pet.owner.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "You are not the owner of this pet" });
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { pets: petId } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedPet = await Pet.findByIdAndUpdate(
    petId,
    { adoptionStatus: "available", owner: null },
    { new: true }
  );

  if (!updatedPet) {
    return res.status(404).json({ message: "Pet not found" });
  }

  res
    .status(200)
    .json({ message: "Pet returned successfully", pet: updatedPet });
});
const savePet = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const petId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPetSaved = user.savedPets.includes(petId);
  if (isPetSaved) {
    return res.status(400).json({ message: "Pet already saved" });
  }

  user.savedPets.push(petId);

  const savedUser = await user.save();

  if (savedUser)
    return res.status(201).json({ message: "Pet Saved sucssfuly" });
});
const deleteSavedPet = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log('userId: ', userId);
  const petId = req.params.id;

  //Find user by ID
  const user = await User.findById(userId);
  //Validate the user he has been found
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.savedPets.includes(petId)) {
    return res.status(404).json({ message: "Pet not found in saved list" });
  }

  //delete pet from user's savedPets

  user.savedPets = user.savedPets.filter(
    (savedPets) => savedPets.toString() !== petId
  );

  await user.save();

  res.status(200).json({
    message: "Pet removed from saved list successfully",
    newList: newList,
  });
});
const getPetsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  //Find user by ID
  const user = await User.findById(userId).populate("savedPets pets");
  console.log('user: ', user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // send all the savedPets and as well the user's  owned pets


  const petsObj = {
    ownedPets: user.pets,
    ownedLength: user.pets?.length,

    savedPets: user.savedPets,
    savedLength: user.savedPets?.length,
  };
  res.status(200).json(petsObj);
});

module.exports = {
  addPet,
  editPet,
  getPetById,
  getPets,
  adoptOrFosterPet,
  returnPet,
  savePet,
  deleteSavedPet,
  getPetsByUserId,
  getAllPets,
};

//TODO: Protected to logged-in users
// TODO: Add picture functionality
