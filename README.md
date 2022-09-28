### v1.3.1
## GOOGLE SIGN IN

1. Ejecutar ```npm install``` para construir los modulos de Node

## Temas de la sección: 

* Carga de archivos
    * con express-fileupload

* Validaciones de archivos
    * Validar extension

* Re-ubicar archivos
    * Renombrar/ubicar archivo segun tipo (usamos npm uuid)

* Actualizar fotografía de un usuario
    * Verificar si el usuario tiene imagen
    * Crear path para buscar la imagen con ```fs.existsSync()``` e eliminar
    * Modificar el model con la nueva imagen

* Borrar archivos

* Cargar imágenes a los productos

* Servicio para mostrar y proteger imágenes
    * Usamos el ```response``` de express => ```return res.sendFile(path);```

* Uso de dichas imágenes en el front-end
    * Localmente podemos dejar tal como esta todo, pero en un servidor como HEROKU, suele eliminar cualquier archivo creado
    post deploy (ejem: subo un archivo a un usuario, heroku terminara borrando el nuevo archivo para proteger la integridad del 
    codigo original).

* Cloudinary
    * Instalar paquete
        * Configurar la variable de entorno (hace la conexion con cloudinary)


* Cloudinary SDK


