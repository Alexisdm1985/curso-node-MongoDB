const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const {
    User, Product, Category,
} = require('../models')


// ---------------------------------------------------------------------- NOTA:
// Un standard de programacion es enviar resultados de esta manera [Data] || [null]
// --------------------------------------------------------------------------------

// User by ID or dynamic
const searchUser = async (termino = '', res) => {

    // By ID
    const mongoID = ObjectId.isValid(termino);

    if (mongoID) {

        const user = await User.findById(termino);

        return res.status(200).json({
            results: (user) ? [user] : []
        });
    };
    // ------------------------------------------ NOTA:
    // Ocupar mas operador ternario en vez de un if - else
    // ---------------------------------------------------

    // Busqueda dinamica

    const regex = new RegExp(termino, 'i');
    // ------------------------------------ NOTA:
    // RegExp es de JAVASCRIPT por lo que no necesita importacion
    // El segundo parametro (o bandera) en esta ocacion representa
    // una busqueda "insensible" = Busca por letra independiente de 
    // masyuc/minusc
    // ------------------------------------------------------------

    const user = await User.find({
        $or: [
            { name: regex },
            { email: regex },
        ],
        $and: [{ state: true }]
    });
    // -------------------------------NOTA:
    // $ es un simbolo para variables de mongo.
    // $or representa un switch/case de opciones
    // ---
    // find() siempre devolvera [data] || [null]
    // ------------------------------------------------

    return res.status(200).json({
        results: user
    });
};

// Product by ID or dynamic
const searchProduct = async (termino = '', res) => {

    // By ID
    const mongoID = ObjectId.isValid(termino);

    if (mongoID) {

        const product = await Product.findById(termino)
            .populate('user', 'name')
            .populate('category', 'name');

        return res.status(200).json({
            results: (product) ? [product] : []
        });
    };

    // Dynamic
    const regex = new RegExp(termino, 'i');
    const product = await Product.find({ name: regex, state: true })
        .populate('user', 'name')
        .populate('category', 'name');

    return res.status(200).json({
        results: product
    });
};

// Category by ID or dynamic
const searchCategory = async (termino = '', res) => {

    // By ID
    const mongoID = ObjectId.isValid(termino);

    if (mongoID) {

        const category = await Category.findById(termino)
            .populate('user', 'name');

        return res.status(200).json({
            results: (category) ? [category] : []
        });
    };

    // Dynamic
    const regex = new RegExp(termino, 'i');
    
    const category = await Category.find({ name: regex, state: true })
        .populate('user', 'name');

    return res.status(200).json({
        results: category
    });
};

const validCollection = [
    'user',
    'product',
    'category',
    'role'
];

// Search MAIN
const search = (req, res = response) => {

    // Lectura
    const { collection, termino } = req.params;

    // Validacion collection
    if (!validCollection.includes(collection)) {
        return res.status(400).json({
            msg: `${collection} no es una busqueda valida`
        });
    };

    // Para no hacer switch se puede crear un objeto y llamarlo luego
    const searchCollection = {
        user() {
            return searchUser(termino, res);
        },
        product() {
            return searchProduct(termino, res);
        },
        category() {
            return searchCategory(termino, res);
        }
    };

    const defaultError = () => {
        res.status(500).json({
            msg: `capa 8 error`
        });
    };

    // Llama al metodo segun la colleccion buscada
    searchCollection[collection] ? searchCollection[collection]() : defaultError();

    // switch (collection) {
    //     case 'user':
    //         searchUser(termino, res);
    //         break;

    //     case 'product':
    // ...
    //         break;
    //     case 'category':
    // ...
    //         break;
    //     default:
    //         return res.status(500).json({
    //             msg: 'Capa 8 error '
    //         });

    // };

};


module.exports = { search };