const {Schema, model } = require('mongoose');


const productSchema = Schema({
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
    },
    price: {
        type: Number,
        default: 0
    },
    disponibility: {
        type: Boolean, 
        default: true 
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

productSchema.methods.toJSON = function(){
    const {__v, state,...data} = this.toObject();
    return data;
};

module.exports = model('Product', productSchema);