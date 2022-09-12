require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    // Al instanciar un server el constructor crea todo esto y llama a los metodos
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'; // Asi cualquier persona sabe los path disponibles
        this.authPath = '/api/auth';

        // Concectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
    };

    async conectarDB(){
        await dbConnection();
    };


    middlewares() {
        
        // CORS
        this.app.use(cors() );

        // Lectura y parseo del body
        this.app.use( express.json());

        // Directorio publico
        this.app.use(express.static('public'));

    };

    routes() {

        // AUTH
        this.app.use(this.authPath, require('../routes/auth'))
        
        // USERS
        this.app.use(this.usersPath, require('../routes/users'))
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log("running at " + this.port);
        });
    };

}

module.exports = Server;