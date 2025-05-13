const express = require('express');
const router = express.Router({ mergeParams: true })
const isValidUser = require('../middleware/isValidUser');
const { registerUser, loginUser, registerGuest, newToken,
    deleteGuestInfo, saveGuestAsUser
} = require('../controllers/userController');

//REGISTRAMOS EL USUARIO
router.post('/register', isValidUser, registerUser)

//LOGUEAMOS EL USUARIO
router.post('/login', loginUser)

//REGISTRAMOS  GUEST USER
router.post('/guest', registerGuest)

//GENERAMOS TOKEN
router.post('/token', newToken)

//BORRAMOS TODA LA INFORMACION RELATIVA AL GUEST 
router.delete('/guest', deleteGuestInfo)

//GUARDAMOS GUEST COMO USER
router.patch('/guest', saveGuestAsUser)

module.exports = router
