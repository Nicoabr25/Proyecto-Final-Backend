import userModel from "../dao/models/user.models.js";


export const PremiumUser = async (req, res) => {
    try {
        const userID = req.params.uid;
        //verificamos que el usuario existe en la base de datos
        const user = await userModel.findById(userID);
        const userRol = user.rol;
        //validar si el usuario subio todos los documentos
        if (user.documents.length < 3 && user.status !== "completo") {
            return res.json({ status: "ERROR", message: "el usuario no ha subido todos los documentos" })
        }
        if (userRol === "user") {
            user.rol = "premium"
        } else if (userRol === "premium") {
            user.rol = "user"
        } else {
            return res.json({ status: "ERROR", message: "no es posible cambiar el tipo de membresia" })
        }
        await userModel.updateOne({ _id: user._id }, user)
        res.send({ status: "succes", message: "Rol modificado" })
    } catch (error) {
        console.log(error.message)
        res.status(404).send("No se pueden obtener membresia premium")
    }
}

export const DocumentsController = async (req, res) => {
    try {
        const userId = req.params.uid //tomo el id de params
        const user = await userModel.findById(userId) //verifico que el usuario exista
        if (user) {
            const identificacion = req.files['identificacion']?.[0] || null; //subio identificacion o no? el [0] es para buscar el primero elemento del objeto identificacion, en este caso fieldname
            const domicilio = req.files['domicilio']?.[0] || null;
            const estadoDeCuenta = req.files['estadoDeCuenta']?.[0] || null;
            if (identificacion) {
                docs.push({ name: "identificacion", reference: identificacion.filename }) //tomo el documento que se envio en el campo identificacion y lo guardo en el array de docs del usuario con el nombre identificacion, ya que el archivo puede tener cualquier nombre
            }
            if (domicilio) {
                docs.push({ name: "domicilio", reference: domicilio.filename }) //tomo el documento que se envio en el campo identificacion y lo guardo en el array de docs del usuario con el nombre identificacion, ya que el archivo puede tener cualquier nombre
            }
            if (estadoDeCuenta) {
                docs.push({ name: "estadoDeCuenta", reference: estadoDeCuenta.filename }) //tomo el documento que se envio en el campo identificacion y lo guardo en el array de docs del usuario con el nombre identificacion, ya que el archivo puede tener cualquier nombre
            }
            if (docs.length == 3) {//verifico si tengo los tres documentos
                user.status = "completo"
            } else {
                user.status = "incompleto"
            }
            user.documents = docs;
            const userUpdate = await userModel.findByIdAndUpdate(user._id, user) //se actualiza en la BD
            res.json({ status: "success", message: "documentos actualizados" })
        } else {
            res.status(404).send("No existe el usuario")
        }
    } catch {
        console.log(error.message)
        res.status(404).send("No se pueden cargar los documentos")
    }
}

// try {
//     const userId = req.params.uid //tomo el id de params
//     const user = await userModel.findById(userId) //verifico que el usuario exista
//     if (user) {
//         const docs = req.files.map(doc => ({ name: doc.originalname, reference: doc.filename })); //arreglo de documentos
//         user.documents = docs
//         user.status = "completo"
//         const userUpdate = await userModel.findByIdAndUpdate(user._id, user) //se actualiza en la BD
//         res.json({ status: "success", message: "documentos actualizados" })
//     } else {
//         res.status(404).send("No existe el usuario")
//     }


// } catch {
//     console.log(error.message)
//     res.status(404).send("No se pueden cargar los documentos")
// }
// }