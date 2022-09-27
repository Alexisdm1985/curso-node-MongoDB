const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createProduct, 
    getProducts,
    getProductByID,
    putProduct,
    deleteProduct
} = require('../controllers/productController');
const { 
    categoryIdExist, 
    categoryStatus, 
    productExist
} = require('../helpers/db-validators');
const { 
    validateJWT, 
    validateFields, 
    isAdminRole
} = require('../middlewares');



/**
 * {{url}}/api/products
 */

const router = Router();

// Crear producto
router.post('/', [
    validateJWT,
    check('name', 'Nombre es obligatorio').not().isEmpty(),
    check('category', 'Categoria es obligatorio').not().isEmpty(),
    check('category', 'No es una categoria valida').isMongoId(),
    check('category').custom(categoryIdExist),
    check('category').custom(categoryStatus), //Prodria dejar estas dos validaciones juntas pero bueh
    // hay que validar precio sea positivo?
    validateFields
], createProduct);

// Obtener todos los productos
router.get('/', getProducts)


// Obtener producto por ID
router.get('/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    validateFields
], getProductByID)

// Actualizar producto
router.put('/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(productExist),
    validateFields
], putProduct);

// Eliminar producto - AdminRole
router.delete('/:id', [
    validateJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    isAdminRole,
    validateFields
], deleteProduct);


module.exports = router;