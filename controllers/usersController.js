// para que js reconozca res como http, de otra forma no sabe de que tipo seria.
const { response } = require('express');

// Para encriptar la pass
const bcryptjs = require('bcryptjs');

// Importamos el modelo hecho con mongoose
const User = require('../models/user');
// ------------------------------------- NOTA:
// se suele usar capitalizado porque se haran instancias del modelo
// ----------------------------------------------------------------------------


// GET
const usersGet = async (req, res = response) => {

    // GET usa QUERY = url
    const { limite = 5, desde = 0 } = await req.query;
    
    // Filtro para la busqueda de usuarios
    const query = {state: true};
    
    // 2 PROMESAS AL MISMO TIEMPO ya que no dependen de la otra
    const [total, users] = await Promise.all([
        
        // Resultado promesa 1 = total
        User.countDocuments(query),
        
        // Resultado promesa 2 = users
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

// --------------------------------------- FORMA NO OPTIMIZADA --------------
        // // find|count aceptan condiciones como filtros en Django
        // const users = await User.find(query)
        //     .skip(Number(desde))
        //     .limit(Number(limite));
        // const total = await User.countDocuments(query);
// --------------------------------------------------------------------------

    res.json({
        total,
        users
    });
    ;
}

// POST | insertar
const userPost = async (req, res = response) => {

    // POST usa BODY
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
// --------------------------------------------------------- NOTA:
    //Mongoose escoge las partes del body que coincidan con el modelo
    // Pero normalmente uno mismo hace las validaciones y envia lo necesario
// ---------------------------------------------------------------------------------

    // Encriptar pass
    const salt = bcryptjs.genSaltSync(); 
// ------------------------------------- NOTA:
    //salt es la cantidad de "vueltas" que realiza bcryptjs mientras mas vueltas
    //mejor pero por defecto son 10 y eso esta bien, por lo que se deja vacio
// ---------------------------------------------------------------------------------
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await user.save();

    res.json({
        user
    });
};

// PUT
const usersPut = async (req, res = response) => {

    const id = req.params.id;
    const { password, google, email, _id, ...remainder } = req.body;
// ------------------------------------------------------------------ NOTA:
    // Extraigo pass, google y email para hacer validaciones 
    // y el remainder es lo que actualizaria el usuario ( osea que sin pass,google, etc)
// -------------------------------------------------------------------------------------

    // Encriptar pass
    if (password) {
        const salt = bcryptjs.genSaltSync();
        remainder.password = bcryptjs.hashSync(password, salt);
    };

    // Encuentra y actualiza lo que exista en el remainder
    const user = await User.findByIdAndUpdate(id, remainder);

    res.json(user);
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API desde controlador'
    });
};

// DELETE
const usersDelete = async (req, res = response) => {
    
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {state: false});
// --------------------------------------------------------------- NOTA:
    // Eliminacion fisica (no recomendada)
    // const user = await User.findByIdAndDelete( id );
// -------------------------------------------------------------------------

    res.json({
        user
    });
};


module.exports = {
    usersGet,
    usersDelete,
    usersPatch,
    usersPut,
    userPost
};