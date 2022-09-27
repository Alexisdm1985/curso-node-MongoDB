const { request, response, json } = require('express');

// Models
const { Category } = require('../models');


// GET by ID
const getCategoriesByID = async (req = request, res = response) => {

    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.status(200).json({
        category
    });

};

// GET todas las categorias con paginacion y populate()
const getCategories = async (req = request, res = response) => {

    // Paginacion
    const { desde = 0, limite = 3 } = req.query;

    // Busca solo las categorias activas
    const query = { state: true }

    try {
        const [categories, total] = await Promise.all([

            // categories con paginacion
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('user', 'name'),
            // ------------------------ NOTA:
            // populate(), Recibe la propiedad que tiene la referencia.
            // Cambia la referencia normal con _id por los datos del documento
            // segun el _id.
            // En este caso nos muestra los datos del usuario y no el _id
            // -----------------------------------------------------------------------


            // Total categorias (COUNT)
            Category.countDocuments(query)
        ]);
        // -------------------------------------------------- NOTA:
        // Promise all permite tener mas de una promesa al mismo tiempo
        // Separar cada promse con una coma
        // ------------------------------------------------------------------

        res.status(200).json({
            total,
            categories
        });

    } catch (error) {
        console.log('error', error)
        res.status(400).json({
            msg: error
        });
    };

};

// POST
const createCategory = async (req = request, res = response) => {

    // Leer BODY
    const name = req.body.name.toUpperCase();

    // Busca en la DB si existe la categoria
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${name} ya existe`
        });
    };

    // Generar data a guardar
    const data = {
        name,
        user: req.user._id
    };
    // ----------------------- NOTA:
    //  En este momendo ya se valido el JWT
    //  En esa validacion se modifica el request, por eso tenemos al usuario
    // PS: Recordar que grabamos solo 2 cosas porque el estado del modelo es default
    // --------------------------------------------------------------------------------

    // Crear categoria
    const category = new Category(data);

    // Guardar
    await category.save();

    res.status(201).json({
        category
    });
};

// PUT privado con jwt
const putCategory = async (req = request, res = response) => {


    // Actualizar referencia usuario modificacion
    const {id: uid} = req.user

    // Actualizar nombre (galletas actual)
    const { id } = req.params;
    const {state, ...data} = req.body;
    // -------------------------------- NOTA:
    // extraemos el state porque ese no se debe actualizar
    // --------------------------------------------------------
    const name = data.name.toUpperCase();

    const categoryDB = await Category.findByIdAndUpdate(id, {name}, {new:true});

    res.status(200).json({
        categoryDB
    });
};

// DELETE
const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const categoryDB = await Category.findByIdAndUpdate(id, { state: false }, {new:true});

    res.json({
        categoryDB
    });
};

module.exports = {
    createCategory,
    getCategories,
    getCategoriesByID,
    putCategory,
    deleteCategory
};