import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express();

app.use(express.static(__dirname + "/../public"))

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views"); //tengo que isar la ruta absoluta (dirname me da la ruta hasta donde se ejecuta el codigo app.js)


const httpServer = app.listen(8080, () => { //instancia de servidor HTTP
  console.log("server listening on port 8080");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {//event listener evento, callback
  console.log("Nuevo cliente conectado")
});

app.use((req, res, next) => {
  req.io = io
  next();
});

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);