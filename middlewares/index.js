const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const isAdminRole = require('../middlewares/validate-roles');
const validateFile = require('../middlewares/validate-file');

// ---------------------------------------------- NOTA:
// Para importar con buenas practicas varios archivos de la misma carpeta
// Creamos constantes que representen todo lo que exportan
// y con spreat operator lo exportamos
// ---------------------------------------------------------------

module.exports = {
    ...validateFields,
    ...isAdminRole,
    ...validateJWT,
    ...validateFile
};