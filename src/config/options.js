import dotenv from "dotenv";
dotenv.config();



export const options = {
    fileSystem: {
        usersFileName: 'users.json',
        productsFileName: 'products.json',
        cartFileName: 'cart.json'
    },
    mongoDB: {
        URL: process.env.MONGO_URL,
    },
    server: {
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION,
    }
};