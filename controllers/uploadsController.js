const { response } = require('express');
const fs = require('fs');
const path = require('path');

// CLOUDINARY
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const { User, Product } = require('../models');
const { loadFileHelper, validModel } = require('../helpers/upload-file');

// Cargar img - /
const uploadFile = async (req, res = response) => {

    try {
        const fileName = await loadFileHelper(req.files, undefined, 'textos');
        return res.json({
            fileName
        });

    } catch (msg) {
        return res.status(400).json({ msg });
    };
};

// Actualizar img - /:collection/:id ### CLOUDINARY ###
const updateImgCloudinary = async (req, res = response) => {

    const { collection, id } = req.params;

    // Dependiendo de la collection obtenemos el modelo

    let model = await validModel(collection, id); // => model || false
    if (!model) {
        return res.status(400).json({ msg: 'Coleccion no valida' });
    };

    try {

        const folder = `RESTserver-nodeJS/${collection}`;

        // Eliminar foto anterior
        if (model.img) {
            const nameArr = model.img.split('/'); //Obtiene la img de mongo como array
            const nameImg = nameArr.at(-1); // => ['cloudinaryID.jpg']
            const [ cloudImgID ] = nameImg.split('.'); // => ['cloudinaryID', 'png']

            cloudinary.uploader.destroy(folder + '/' + cloudImgID);
        };

        // CLOUDINARY upload
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { folder });

        // Guardar link de img en mongoDB
        model.img = secure_url;
        await model.save();

        return res.status(200).json({ model });
        // LOCALHOST
        // Crea y guarda la imagen en la base de datos (link simbolico?)
        // const fileName = await loadFileHelper(req.files, undefined, collection); // default: png, jpg...
        // model.img = fileName;
        // await model.save();

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: 'Ha ocurrido un error inesperado, checkear consola'
        });
    };
};

// Mostrar imagen al cliente - /:collection/:id
const sendImg = async (req, res = response) => {

    const { collection, id } = req.params;

    let model = await validModel(collection, id); // => model || false
    if (!model) {
        return res.status(400).json({ msg: 'Coleccion no valida' });
    };

    // Mostrar imagen
    try {

        if (!model.img) { //404-img
            const imgPath = path.join(__dirname, '../assets/no-image.jpg');
            return res.sendFile(imgPath);
        };

        const imgPath = path.join(__dirname, '../uploads/', collection, model.img);
        if (!fs.existsSync(imgPath)) {
            return res.sendFile(imgPath);
        };

        return res.sendFile(imgPath);

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: 'Ha ocurrido un error inesperado, checkear consola'
        });
    };
};



// --------------- ESTO ES DE FORMA LOCAL ----------------------------------------------
// Actualizar img - /:collection/:id
// const updateImg = async (req, res = response) => {

//     const { collection, id } = req.params;

//     // Dependiendo de la collection obtenemos el modelo

//     let model = await validModel(collection, id); // => model || false
//     if (!model) {
//         return res.status(400).json({ msg: 'Coleccion no valida' });
//     };

//     try {
//         // Eliminar foto anterior
//         if (model.img) {
//             // Crea el camino a buscar
//             const imgPath = path.join(__dirname, '../uploads/', collection, model.img);

//             if (fs.existsSync(imgPath)) {
//                 fs.unlinkSync(imgPath);
//             };
//         };

//         // Crea y guarda la imagen en la base de datos (link simbolico?)
//         const fileName = await loadFileHelper(req.files, undefined, collection); // default: png, jpg...
//         model.img = fileName;

//         await model.save();

//         return res.status(200).json({ model });

//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({
//             msg: 'Ha ocurrido un error inesperado, checkear consola'
//         });
//     };
// };

module.exports = {
    uploadFile,
    updateImgCloudinary,
    sendImg
};

// --------------------------------------------------------------------------- NOTA:
// NOTA VALIDA PARA UPLOADFILE() con LOADFILEHELPER()
// Codigo sacado/manipulado de la documentacion de express-fileupload
// https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
// 1: express-fileupload es manejado desde el SERVIDOR como middleware.
// 2: Desde postman, se envian archivos en el body/ form-data
// 3: Crear constante que guarde el archivo del request
// 4: Configurar el path donde se encuentra la carpeta que tendra el archivo
// normalmente es en la raiz de la aplicacion con una carpeta llamada upload.
// Ademas ocupamos path.join (modulo propio de Node), para crear la ruta
// 5: Finalmente ocupamos mv() (funcion propia del modulo express-fileupload?)
// para cargar el archivo en el path anteriormente creado.
//
// PS: Para tener un codigo reutilizable, crearemos un helper que valide y cree ubicacion
// del archivo de no existir. Asi no tenemos un controller monstruoso xd.
// ------------------------------------------------------------------------------------------