const { Schema, model } = require('mongoose');

// Schema es la creacion de la tabla como objeto literal
const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La passs es obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

    // NOTA: el id es creado por mongoose automaticamente
});

// Retorno el usuario sin la pass ni __v 
UserSchema.methods.toJSON = function(){
    const {__v, password, ...user} = this.toObject();
    return user;
};

module.exports = model( 'User', UserSchema );
// ------------------------------------------- NOTA: 
// Exportamos el shema como model, significa que ya esta en formato tabla
// como lo vemos en cualquier base de datos digamos