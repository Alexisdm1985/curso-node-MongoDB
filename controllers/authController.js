// Solo para que ayude en el tipado
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User / password no son correctos -- email'
            });
        };

        // Verificar si el usuario esta activo
        if (!user.state) {
            return res.status(400).json({
                msg: 'User / password no son correctos -- state:false'
            });
        };
        // --------------------------------------------------------------- NOTA:
        // !user.state es lo mismo que user.state == FALSE
        // -------------------------------------------------------------------------

        // Verificar pass
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / password no son correctos -- password: incorrect'
            });
        };

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'hable con el administrador'
        });
    };

};


module.exports = {
    login
}

