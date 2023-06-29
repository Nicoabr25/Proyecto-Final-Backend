import userModel from "../dao/models/user.models.js";

export const PremiumUser = async (req, res) => {
    try {
        const userID = req.params.uid;
        //verificamos que el usuario existe en la base de datos
        const user = await userModel.findById(userID);
        const userRol = user.rol;
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
        res.status(404).send("No se pueden obtener membresia prmium")
    }
}