const {
    Category,
    Role,
    User,
    Product
} = require('../models')


/**
 * 
 * CATEGORIES
 */
const categoryIdExist = async (id) => {
    const category = await Category.findById(id)
    if (!category) {
        throw new Error(`La categoria con id ${id} no existe en la base de datos`);
    };

};

/** 
 * PRODUCTS
*/

const categoryStatus = async (id) => {

    const category = await Category.findById(id);
    if (!category.state) {
        throw new Error(`Categoria con id ${id} no existe en la base de datos`);
    };
};

const productExist = async (id) => {

    const product = await Product.findById(id);
    if (!product || !product.state) {
        throw new Error(`Producto con id ${id} no existe en la base de datos`);
    };
};

/** 
 * USERS
*/

const isValidRole = async (role) => {
    const exist = await Role.findOne({ role });
    if (!exist) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    };
};

const emailExist = async (email) => {
    const exist = await User.findOne({ email });
    if (exist) {
        throw new Error(`El email ${email} ya existe en la base de datos`);
    };
};

const userIdExist = async (id) => {
    const exist = await User.findById(id);
    if (!exist) {
        throw new Error(`El id ${id} no existe en la base de datos`);
    };
};

const validCollection = (collection = '', collections = []) => {
    if (!collections.includes(collection)) {
        throw new Error(`Coleccion ${collection} no es valida `);
    };

    return true;
};



module.exports = {
    isValidRole,
    emailExist,
    userIdExist,
    categoryIdExist,
    categoryStatus,
    productExist,
    validCollection
};