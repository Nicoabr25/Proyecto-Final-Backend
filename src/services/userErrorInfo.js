export const generateUserErrorInfo = (user) => {
    return `Alguno de los campos para crear el usuario no es valido
    Lista de campos requeridos:
    email: debe ser un campo tipo string, pero se recibio ${user.email},
    Nombre: debe ser un campo tipo string, pero se recibio ${user.first_name},
    Apellido: debe ser un campo tipo string, pero se recibio ${user.last_name},
    Age: email: debe ser un campo tipo Number, pero se recibio ${user.age},
    `
}

export const LoginErrorInfo = (user) => {
    return `Alguno de los campos para crear el usuario no es valido
    Lista de campos requeridos:
    email: debe ser un campo tipo string, pero se recibio ${user.email},
    password: debe ser un campo tipo string, pero se recibio ${user.password},
    `
}

export const LoginAuthErrorInfo = () => {
    return `Usuario y/o contraseña incorrecto.`
}

export const ProductErrorInfo = () => {
    return `Error al recuperar los productos`
}

export const CartNotFoundErrorInfo = () => {
    return `No se pudo obtener el id del carrito, posibliemente porque no se encuentre logueado`
}