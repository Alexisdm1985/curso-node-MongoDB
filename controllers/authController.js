// Solo para que ayude en el tipado
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

// Models 
const User = require('../models/user');
// JWT
const { generateJWT } = require('../helpers/generate-jwt');
// Google Sign-In
const { googleVerify } = require('../helpers/google-verification');



// GOOGLE SIGN IN
const googleSignIn = async (req = request, res = response) => {

    // Desde el fetch en index.html
    const { id_token } = req.body;

    // Verificar cuenta
    try {
        // Funcion sacada de la documentacion con retoques
        const { email, name, picture } = await googleVerify(id_token);
        

        // Verificar si el correo ya existe en la base de datos
        let user = await User.findOne({ email });
        if (!user) {

            // Crear usuario segun formato de nuestro Model User
            const data = {
                name,
                email,
                password: ':P',
                img: picture,
                google: true,
                role: 'VENTAS_ROLE'
            };

            user = new User(data);
            await user.save();
        };

        // Validacion del state del usuario
        if (!user.state) {
            return res.status(401).json({
                msg: 'Hable con el jefe e.e, user denied'
            });
        };

        // Generar el JWT
        const token = await generateJWT(user.id);

        return res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'No se pudo verificar el token',
            id_token
        });
    };
};

// LOGIN
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
    login,
    googleSignIn
}

