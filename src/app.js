import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io";
import mongoose from "mongoose";
import ChatManager from "./dao/db-managers/chat.manager.js"


const app = express();
let messages = [];
const chatManager = new ChatManager();

//Public//

app.use(express.static(__dirname + "/../public"))

//Handlebars//

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views"); //tengo que isar la ruta absoluta (dirname me da la ruta hasta donde se ejecuta el codigo app.js)

//Mongoose//
mongoose.connect("mongodb+srv://nicoabr:mipassword1234@cluster0.wlygjnj.mongodb.net/ecommerce?retryWrites=true&w=majority").then((conn) => {
  console.log("Connected to DB!!!")
})

//Socket.io//
const httpServer = app.listen(8080, () => { //instancia de servidor HTTP
  console.log("server listening on port 8080");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {//event listener evento, callback
  console.log("Nuevo cliente conectado")

  socket.on("messages", async (data) => {
    console.log(data);
    const { username, message } = await chatManager.newMessage(data)
    messages.push(data);

    io.emit("messages", messages) //le paso el array de mensajes apra que lo emita a todos los clientes
  });

  socket.on("new-user", (username) => {
    socket.emit("messages", messages) //cuando un usuario nuevo se conecta accede a los mensajes
    socket.broadcast.emit("new-user", username); //les envia a todos que el un nuevo usuario se conecto
  })
});

app.use((req, res, next) => {
  req.io = io
  next();
});

//Routers//
app.use("/", viewsRouter); //viewa.router.js que usa donde se hace el render de Handlebarss
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);



