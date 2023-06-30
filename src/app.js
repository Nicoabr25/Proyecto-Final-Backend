//----- Propios -----//
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js"
import { __dirname } from "./utils.js"
import ChatManager from "./dao/db-managers/chat.manager.js"
import authRouter from "./routes/Auth.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initializePassport } from "./config/passport.config.js";
import { options } from "./config/options.js";
import { addLogger } from "./logger/logger.js";
import usersRouter from "./routes/users.router.js"
import { swaggerSpecs } from "./config/docConfig.js";

//----- Paquetes -----//
import express from "express";
import expressHbs from "express-handlebars"
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";// permite unir __dirname y las demás rutas cambiando el / por \
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import jwt from "jsonwebtoken";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //para leer formularios


let messages = [];
const chatManager = new ChatManager();

//Public//

app.use(express.static(__dirname + "/../public"))

// Cookies//
app.use(cookieParser());

//Handlebars//

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views")); //tengo que i ar la ruta absoluta (dirname me da la ruta hasta donde se ejecuta el codigo app.js)

const hbs = expressHbs.create({}) //se agrega funcionalidad a handlebars
hbs.handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

//Sessions//Configura la sessions y las almacena en MongoDB

app.use(session({
  store: MongoStore.create({
    mongoUrl: options.mongoDB.URL,
    ttl: 3600,
  }),
  secret: options.server.secretSession,
  resave: true,
  saveUninitialized: true,

}));

//Configurar passport
initializePassport();
app.use(passport.initialize());//nuestro server inicializa passport
app.use(passport.session()); //Una vez que me autentico con passport, automaticamente me crea la session de ese usuarrio


export const port = options.server.port;

//Socket.io// Comunicación servidor - cliente por Web Socket
const httpServer = app.listen(port, () => { //instancia de servidor HTTP
  console.log(`server listening on port ${port}`);
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

//Routers// Rutas de vista

app.use("/", viewsRouter); //viewa.router.js que usa donde se hace el render de Handlebarss
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/session", authRouter);
app.use("/api/users", usersRouter);
app.use(errorHandler)//cada vez que se haga una peticion va a pasar por aca
app.use(addLogger);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))//endopoint donde podemos ver la documentacion
// app.use("/products", viewsRouter);
// app.use("/login", viewsRouter);
// app.use("/profile", viewsRouter);
// app.use("/signup", viewsRouter);
// app.use("/chat", viewsRouter)