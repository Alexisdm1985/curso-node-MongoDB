// para que js reconozca res como http, de otra forma no sabe de que tipo seria.
const {response} = require('express');

// Para encriptar la pass
const bcryptjs = require('bcryptjs');

// Importamos el modelo hecho con mongoose
// se suele usar capitalizado porque se haran instancias del modelo
const User = require('../models/user');


const usersGet = (req, res = response) => {

    // GET usa QUERY
    const {nombre, edad, pareja} = req.query;

    res.json({
        msg: 'get API desde controlador',
        nombre,
        edad,
        pareja
    });
;}

// POST | insertar
const userPost = async(req, res = response) => {

    // POST usa BODY
    const {name, email, password, role} = req.body;

     //Mongoose escoge las partes del body que coincidan con el modelo
    // Pero normalmente uno mismo hace las validaciones y envia lo necesario
    const user = new User( {name, email, password, role} );

    // Encriptar pass
    const salt = bcryptjs.genSaltSync(); //salt es la cantidad de "vueltas" que realiza bcryptjs mientras mas vueltas
                                        //mejor pero por defecto son 10 y eso esta bien, por lo que se deja vacio
    user.password = bcryptjs.hashSync( password, salt);

    // Guardar en DB
    await user.save();

    res.json({
        user
    });
};

// PUT
const usersPut = async (req, res = response) => {

    const id = req.params.id;
    
    // Extraigo pass, google y email para hacer validaciones 
    // y el remainder es lo que actualizaria el usuario(sin pass,google, etc)
    const { password, google, email, _id, ...remainder } = req.body;

    // TODO: validar contra la base de datos
    
    // Encriptar pass
    if (password){
        const salt = bcryptjs.genSaltSync();
        remainder.password = bcryptjs.hashSync( password, salt);
    };

    // Encuentra y actualiza lo que exista en el remainder
    const user = await User.findByIdAndUpdate(id, remainder);

    res.json({
        msg: 'put API desde controlador',
        user
    });
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API desde controlador'
    });
};

// DELETE
const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API desde controlador'
    });
};


module.exports = {
    usersGet,
    usersDelete,
    usersPatch,
    usersPut,
    userPost
};