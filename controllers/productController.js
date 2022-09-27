const { response } = require('express');
const { Product } = require('../models');


// Crear producto - privado
const createProduct = async (req, res = response) => {

    const { name, price, disponibility, category } = req.body;
    const { id } = req.user

    // Buscar producto en la base de datos
    const product = await Product.findOne({name});
    if(product){
        return res.status(400).json({
            msg: `El nombre ${name} ya existe en la base de datos`
        });
    };

    // Creacion producto
    const data = {
        name: name.toUpperCase(),
        price,
        disponibility,
        user: id,
        category
    };

    const newProduct = new Product(data)

    await newProduct.save();

    res.status(200).json({
        newProduct
    });

};

// Obtener productos - paginaciones 
const getProducts = async (req, res = response) => {

    const { desde = 0, limite = 5 } = req.query

    // Verificar state
    const query = { state: true };

    const products = await Product.find(query)
        .skip(desde)
        .limit(limite)
        .populate('user', 'name')
        .populate('category', 'name');

    res.json({
        products
    })
};

// Obtener producto por id
const getProductByID = async (req, res = response) => {

    const { id } = req.params;

    // Verificamos el state
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');

    if (!product || !product.state) {
        res.status(400).json({
            msg: `El producto con id ${id}, no existe en la base de datos`
        });
    };
    // ------------------------------------------------------------------- NOTA:
    // Esto deberia estar validado con check o un middleware
    // -------------------------------------------------------------------------


    res.json({
        product
    });
};

// Actualizar - privado
const putProduct = async (req, res = response) => {

    const { name, disponibility, price } = req.body;
    if(!name && !disponibility && !price ) {
        res.status(400).json({
            msg: `No se ha ingresado ningun valor a modificar, actualizacion denegada.`
        });
    };

    const {id} = req.params;

    const data = {
        name: name? name.toUpperCase() : name,
        disponibility,
        price
    };

    const product = await Product.findByIdAndUpdate(id, data, {new:true});

    res.status(200).json({
        product
    });
};

// Del - Admin Role only
const deleteProduct = async (req, res = response) => {

    const {id} = req.params;

    const deleteProduct = await Product.findByIdAndUpdate(id, {state:false}, {new:true})

    res.status(200).json({
        deleteProduct
    });
};

module.exports = {
    createProduct,
    getProducts,
    getProductByID,
    putProduct,
    deleteProduct
};