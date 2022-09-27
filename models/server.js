require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    // Al instanciar un server el constructor crea todo esto y llama a los metodos
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categorias',
            products: '/api/products',
            search: '/api/search',
            user: '/api/users',
        }

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
        this.app.use(this.paths.auth, require('../routes/auth'));
        
        // CATEGORIES
        this.app.use(this.paths.categories, require('../routes/categorias'));
        
        // PRODUCTS
        this.app.use(this.paths.products, require('../routes/products'));
        
        // SEARCH
        this.app.use(this.paths.search, require('../routes/search'));
        
        // USERS
        this.app.use(this.paths.user, require('../routes/users'));

        
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log("running at " + this.port);
        });
    };

}

module.exports = Server;