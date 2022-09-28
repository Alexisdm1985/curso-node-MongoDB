const { Router } = require('express');
const { check } = require('express-validator');

const { 
    uploadFile, 
    updateImgCloudinary, 
    sendImg 
} = require('../controllers/uploadsController');
const { 
    validateFields, 
    validateFileInput 
} = require('../middlewares');
const { validCollection } = require('../helpers');



const router = Router();

// Cargar archivo
router.post('/', [
    validateFileInput,
    validateFields
], uploadFile);

// Actualizar IMG user||producto||categoria
router.put('/:collection/:id', [
    validateFileInput, //Valida que venga el archivo
    check('id', 'El ID es obligatorio').notEmpty(),
    check('id', 'El ID no es un id valido').isMongoId(),
    check('collection').custom( (c) => validCollection(c, ['users', 'products'])),
    // -------------------------------------------------------------------------- NOTA:
    // validCollection() tambien lo podriamos haber creado en el controller,
    // tal como esta en searchController, pero esta es otra forma, solo para crear
    // un helper en db-validators
    // --------------------------------------------------------------------------------
    validateFields
], updateImgCloudinary);
// ], updateImg);

// Mostrar/Enviar imagen el front end
router.get('/:collection/:id', [
    check('id', 'El ID es obligatorio').notEmpty(),
    check('id', 'El ID no es un id valido').isMongoId(),
    check('collection').custom( (c) => validCollection(c, ['users', 'products'])),
    validateFields
], sendImg);


module.exports = router;