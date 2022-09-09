// TERCEROS
const { Router } = require('express');
const { check } = require('express-validator');

// VALIDACIONES
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, emailExist, userIdExist } = require('../helpers/db-validators');

const {
    usersGet,
    usersDelete,
    usersPatch,
    usersPut,
    userPost
} = require('../controllers/usersController');


// Esto reemplaza al app.get()
const router = Router();

// GET
router.get('/', usersGet);
// ---------------------------------- FORMA NO OPTIMIZADA -------------
    // const express = require('express');
    // const app = express();
    // this.app.get('/', (req, res) => {
    // res.send('HOLIS')
    // });
// --------------------------------------------------------------------

// POST
router.post('/', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(isValidRole),
    validateFields
// ------------------------------------ NOTA:
    // ((role) => isValidRole(role)) es lo mismo que lo de arriba
    // - Otra forma de buscar es con isIn
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
// -------------------------------------------------------------------------------------
], userPost);
// ------------------------------------------------------------------------------- NOTA:
// Con 2 params es path + controller y con 3 params, al medio son middleware
// tener en cuenta que estos middlewares son del package express-validator
// -------------------------------------------------------------------------------------

// PUT
router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(userIdExist),
    check('role').custom(isValidRole),
    validateFields
], usersPut);

router.patch('/', usersPatch);


// DELETE
router.delete('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(userIdExist),
    validateFields
], usersDelete);

module.exports = router;