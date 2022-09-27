const Category = require('./categoria');
const Product = require('./product');
const Role = require('./role');
const User = require('./user');

module.exports = {
    Category,
    Product,
    Role,
    User,

};
// -------------- NOTA:
    // Como son modelos y no funciones, no se ocupa spread operator
// -----------------------------------------------------------------------