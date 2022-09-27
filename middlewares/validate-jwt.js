const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    };

    // Validacion JWT
    try {

        // Extraemos el uid del payload una vez verificado
        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);
        
        // Leer usuario logueado
        const user = await User.findById(uid);
        if (!user){
            return res.status(401).json({
                msg: 'Token no valido --Usuario undefine'
            });
        };
        
        // Verificamos si el uid tiene estado true
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token no valido --State false'
            });
        };

        // Modificamos el request para usar los datos en controladores
        req.user = user;

        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        });
    };
};



module.exports = {
    validateJWT
}