//  TERCEROS
const { Router } = require('express');
const { check } = require('express-validator');
// CONTROLLERS
const { login, googleSignIn } = require('../controllers/authController');
// MIDDLEWARES
const { validateFields } = require('../middlewares/validate-fields');
// -----------------------------------------------------------------------------------------------


// Instanciar Router()
const router = Router();


// POST
router.post('/login', [
    check('email', 'Debe ser un email con formato valido').isEmail(),
    check('password', 'Falta la pass').not().isEmpty(),
    validateFields
], login);

// GOOGLE SIGN-IN
router.post('/google', [
    check('id_token', 'ID Token de Google es necesario').not().isEmpty(),
    validateFields
], googleSignIn);
// ------------------------------------------------------------- NOTA:
// Este POST viene del fetch en el index.
// -----------------------------------------------------------------------------


module.exports = router;