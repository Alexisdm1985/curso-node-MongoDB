const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validate-fields');

// Instanciar Router()
const router = Router();

// TODO: AGREGAR CONTROLADOR
router.post('/login', [
    check('email', 'Debe ser un email con formato valido').isEmail(),
    check('password', 'Falta la pass').not().isEmpty(),
    validateFields
], login);


module.exports = router;