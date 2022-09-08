# EXPRESS basado en clases | WebServer + RESTserver

1. Ejecutar ```npm install``` para construir los modulos de Node

-Aquí cubriremos varios temas como: 
- CRUD
- Encriptación de contraseñas
- Validaciones personalizadas
- Creación de roles
- Conexiones con MLAB
- Despliegue de base de datos en la nube
- Conexión con Robo 3T con base de datos en la nube
- Configuración de variables de entorno
- Borrado de archivos
- Eliminado físico de la base de datos
- Eliminación por estado en un campo de la colección

## Nuevos packages
- Mongoose = ODM para usar mas facil codigos relacionados con MongoDB. Algo asi como express para crear servidores

- connect()
- Schema y model

### Creacion usuario mongoose
- Usamos Schema({}) y dentro las propiedades con sus valores
    -type
    -required
    -default
- Se importa el schema como model
    - module.exports = model('User', UserSchema);

- En donde se requiera, se importa y se instancia como un objeto en el que en el que como "constructor" le damos los argumentos necesarios. Estos son creados en el schema

### Guardar usuario
- Usar el metodo post
- instanciar el modelo a guardar
- .save(); debe ser async