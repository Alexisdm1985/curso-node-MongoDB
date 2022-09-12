const jwt = require('jsonwebtoken');


const generateJWT = (uid = '') => {

    // Debe retornar una promesa
    return new Promise((resolve, reject) => {

        const payload = { uid };

        // Generar token
        jwt.sign(payload, process.env.PRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo crear el token');

            } else {
                resolve(token);
            };
        });
    });

};
// -------------------------------------------- NOTA:
// el payload debe ser un objeto literal
// sign() se refiere a firma(r).
// sign() recibe 3+1 parametros, payload | privatekey || options || callback()
// Recordar que una promesa siempre devuelve un reject/resolve
// ---------------------------------------------------------


module.exports = {
    generateJWT
}