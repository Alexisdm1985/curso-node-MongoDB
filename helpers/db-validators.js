const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role) => {
    const exist = await Role.findOne({role});
    if (!exist){
        throw new Error(`El role ${role} no existe en la base de datos`);
    };
};

const emailExist = async(email) => {
    const exist = await User.findOne({email});
    if(exist){
        throw new Error(`El email ${email} ya existe en la base de datos`);
    };
};

const userIdExist = async(id) => {
    const exist = await User.findById(id);
    if(!exist){
        throw new Error(`El id ${id} no existe en la base de datos`);
    };
};



module.exports = {
    isValidRole,
    emailExist,
    userIdExist
};