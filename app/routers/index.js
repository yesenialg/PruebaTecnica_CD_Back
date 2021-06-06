const express = require('express');
const { getPersonaLogin } = require('../controllers/Personas/auth.controller');

const router = express.Router();
const _personasController = require('../controllers/Personas/Personas.controller');
const _authController = require('../controllers/Personas/auth.controller')

router
    .post('/login', _authController.getPersonaLogin);

//MIDDLEWARE
router.use([_authController.verifyTokenMiddleWare]);


router
    .get('/verify', _authController.verifyToken)
    .get("/personaGet/:id", _personasController.getPersona)
    .get('/personasGet', _personasController.getPersonas)
    .post('/personaCreate', _personasController.createPersona)
    .put('/personaUpdate/:id', _personasController.updatePersona)
    .delete('/personaDelete/:id', _personasController.deletePersona);

module.exports = router;