const { response } = require("express");


const isAdminRole = (req, res = response, next) => {

    // Validar que en el request venga el usuario
    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    };

    const { role, name } = req.user;
    
    if( role != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es administrador`
        });
    };

    next();
};


module.exports = {
    isAdminRole
};