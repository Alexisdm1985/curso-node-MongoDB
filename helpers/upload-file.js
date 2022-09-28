const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { User, Product } = require('../models');
const { Model } = require('mongoose');


const extensionPorDefecto = ['png', 'jpg', 'jpeg', 'gift'];

// Retorna una promesa
const loadFileHelper = (files, extensiones = extensionPorDefecto, carpeta = '') => {

    return new Promise((resolve, reject) => {

        // Guardar el archivo
        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado.at(-1);

        // Validar extension
        if (!extensiones.includes(extension)) {
            return reject('error, extension no valida | ' + extensiones);
        };

        // ID + extension = Nuevo nombre del archivo
        const archivoUuid = uuidv4() + '.' + extension;

        // Creacion de path 
        const uploadPath = path.join(__dirname, '../uploads', carpeta, archivoUuid);

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function (err) {
            if (err) {
                console.log(err)
                return reject('Ha ocurrido un problema con mv() method');
            };
            return resolve(archivoUuid)
        });

    });

};

const validModel = async (collection, id) => {
    let model;

    switch (collection) {
        case 'users':
            return model = await User.findById(id);
            // break;
        case 'products':
            return model = await Product.findById(id);
            // break;
        default:
            return false;
    };

};

module.exports = { 
    loadFileHelper,
    validModel
};