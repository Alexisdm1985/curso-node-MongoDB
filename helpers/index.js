const dbValidator = require('./db-validators');
const generateJwt = require('./generate-jwt');
const googleVerification = require('./google-verification');
const loadFile = require('./upload-file.js');


module.exports = {
    ...dbValidator,
    ...generateJwt,
    ...googleVerification,
    ...loadFile,
};