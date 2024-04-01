const express = require('express')
const router = express.Router()
const petController = require('../controllers/petControllers');
const upload = require("../middlewares/imagesMiddleware");



router.post('/pet', upload.single("picture"), petController.addPet);
router.get('/pet/:id', petController.getPetById);
router.put('/pet/:id', petController.editPet);
router.get('/pets', petController.getPets);
router.get('/all/pets', petController.getAllPets);
router.post('/pet/:id/adopt', petController.adoptOrFosterPet);
router.post('/pet/:id/return', petController.returnPet);
router.post('/pet/:id/save', petController.savePet);
router.put('/pet/:id/save', petController.deleteSavedPet);
router.post('/pet/user', petController.getPetsByUserId);

module.exports = router