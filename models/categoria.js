const { Schema, model } = require('mongoose');


const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: [true, 'Estado es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Usuario es obligatorio']
    }
    // ------------------------------------- NOTA:
    // type: Schema.Types.ObjectId = type: Otro modelo del tipo mongoose broh
    // ref: Y se llama 'User' || El nombre debe ser exactamente igual al modelo referenciado
    // ---------------------------------------------------------------------------------------


});

// Retorno el usuario sin la pass ni __v 
CategorySchema.methods.toJSON = function(){
    const {__v, state,...category} = this.toObject();
    return category;
};

module.exports = model('Category', CategorySchema);