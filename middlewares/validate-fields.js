
const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    };

    next();

};

// NOTA:
// Next(); es el tercer parametro de los middlewares, y quiere decir 
// Si todo va bien, sigue con el siguiente middleware y si ya no hay mas
// pues llamar el controlador correspondiente

module.exports = {
    validateFields
}