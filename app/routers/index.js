const express = require('express');

const router = express.Router();
const _personasController = require('../controllers/Personas/Personas.controller')

router
    .get('/personaGet', _personasController.getPersona)
    .get('/personasGet', _personasController.getPersonas)
    .post('/personaCreate', _personasController.createPersona)
    .put('/personaUpdate', _personasController.updatePersona)
    .delete('/personaDelete', _personasController.deletePersona);

module.exports = router;