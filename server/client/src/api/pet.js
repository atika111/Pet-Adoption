import axios from "axios";
import utilities from "../utilitiesClient";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: serverUrl,
});

const addPet = async (newPet) => {
  
  try {
    const {data} = await api.post(`${serverUrl}/pet/pet`,newPet)
    return data
  } catch (error) {
    console.log('error: ', error);
    
  }
};

const getPetById = async (petId) => {
  try {
    const { data } = await api.get(`${serverUrl}/pet/pet/${petId}`);
    return data;
  } catch (error) {
    console.log('error: ', error);
    console.log("error: ", error?.response?.data?.message);
  }
};

const editPet = async (newEditPet, petId) => {
try {
  const data = await api.put(`${serverUrl}/pet/pet/${petId}`, {
    newEditPet
  })
  return data
} catch (error) {
  console.log('error: ', error);
  
}
};

const getPets = async (queryParams) => {
  try {
    const { data } = await api.get(`${serverUrl}/pet/pets/?${queryParams}`);
    if(data === null || undefined) throw Error({message: 'No value'})

    return data;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw new Error('Failed to fetch pets');
  }
};

const getAllPets = async () => {
  try {
    const {data} = await api.get(`${serverUrl}/pet/all/pets`)
    return data
  } catch (error) {
    console.log('error: ', error);
    
  }
};

const adoptOrFosterPet = async (adoptionData) => {
  console.log('adoptionData: ', adoptionData);
  try {
    const {data} = await api.post(`${serverUrl}/pet/pet/${adoptionData.petId}/adopt`, 
    {
      userId: adoptionData.userId,
      adoptionStatus: adoptionData.adoptionStatus
      
    }
    )
    return data
  } catch (error) {
    console.log('error: ', error);
    
  }
};

const returnPet = async (userId, petId) => {
  try {
    const {data} = await api.post(`${serverUrl}/pet/pet/${petId}/return`, {userId})
    console.log('data: ', data);
    return data
  } catch (error) {
    throw new Error(error.response.data)
    console.log('error: ', error);
    
  }
};

const savePet = async (userId, petId) => {

  try {
    const {data} = await api.post(`${serverUrl}/pet/pet/${petId}/save`, {
      userId: userId,
    });
    return data.message;
  } catch (error) {
    console.log("error: ", error.response.data.message);
    return error.response.data.message
  }
};

const deleteSavedPet = async (userId, petId) => {
  try {
    const {data} = await api.put(`${serverUrl}/pet/pet/${petId}/save`, {
      userId
    });
    return data.message;
  } catch (error) {
    console.log("error: ", error.response.data.message);
    return error.response.data.message
  }
};

const getPetsByUserId = async (userId) => {
  console.log('userId: ', userId);
  try {
    const {data} = await api.post(`${serverUrl}/pet/pet/user`, {userId})
    console.log('data: ', data);
    return data
  } catch (error) {
    console.log('error: ', error);
    throw Error({message: 'Error pets'})
    
  }
};

export {
  api,
  addPet,
  getPetById,
  editPet,
  getPets,
  getAllPets,
  adoptOrFosterPet,
  returnPet,
  savePet,
  deleteSavedPet,
  getPetsByUserId,
};
