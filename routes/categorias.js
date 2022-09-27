// TERCEROS
const { check } = require('express-validator');
const { Router } = require('express');

// JWT
const { 
    validateJWT,
    validateFields,
    isAdminRole

} = require('../middlewares');

const { 
    createCategory, 
    getCategories,
    getCategoriesByID,
    putCategory,
    deleteCategory
} = require('../controllers/categorias');
const { categoryIdExist, isValidRole } = require('../helpers/db-validators');
// --------------------------------------------------------------

const router = Router();

/**
 * {{url}}/api/categorias
 */


// GET todas las categorias - publico
router.get('/', getCategories);

// GET categorias por id - publico
router.get('/:id', [
    check('id', 'Debe ingresar id').not().isEmpty(),
    check('id', 'Debe ingresar id valido').isMongoId(),
    check('id').custom(categoryIdExist),
    validateFields
],getCategoriesByID);

// POST categoria - privado - Requiere token valido
router.post('/', [
    validateJWT,
    check('name', 'Debe ingresar nombre').not().isEmpty(),
    validateFields
], createCategory);


// PUT por id - privado - Requiere token valido
router.put('/:id', [
    validateJWT,
    check('name', 'Debe ingresar nombre').not().isEmpty(),
    check('id', 'Debe ingresar id').not().isEmpty(),
    check('id', 'Debe ingresar id valido').isMongoId(),
    check('id').custom(categoryIdExist),
    // VALIDAR QUE EL STATUS NO SEA FALSE
    // SI EL NUEVO NOMBRE ES EL MISMO, AVISAR 
    validateFields
], putCategory);

// DELETE una categoria - Admin solamente
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Debe ingresar id valido').isMongoId(),
    check('id').custom(isValidRole),
    validateFields
    // VALIDAR QUE EL STATUS NO SEA FALSE
], deleteCategory);

module.exports = router;