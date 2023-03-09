import multer from "multer";

const storage = multer.diskStorage({
    destination: "./public/img", //destino del archivo
    filename: function (req, file, cb) { // para mantener el nombre del archivo original, agrego una funcion que tome como parametro, la reques, el archivo y un callback para retornar el nombre del archivo (para poder leerlo tengo que acceder primero al archivo.)
        cb(null, file.originalname); //primer parametro, protencial error, segundo nombre del archivo
    }
});

const uploader = multer({ storage }); // generamos un uploader, que ejecuta multer con las configuraicon de storage

export default uploader;
