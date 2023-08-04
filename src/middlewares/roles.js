export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.session) {
            return res.redirect("/error")
            // return res.json({ status: "Error", message: "necesitas autentificarte" })
        }
        if (!roles.includes(req.session.rol)) {
            return res.redirect("/error")
            // return res.json({ status: "Error", message: "No estas autorizado" })
        }
        next(); //esta incluido en los roles valido entonces lo dejamos continuar
    }
}