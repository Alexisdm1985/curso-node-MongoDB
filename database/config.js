const mongoose = require('mongoose');

// Conexion a mongoDB
const dbConnection = async () => {

    try {
        // url como argumento
        await mongoose.connect( process.env.MONGODB_CNN ); //Esto devuelve una promesa por eso podemos ocupar await o .then

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    };
};



module.exports = {
    dbConnection
};