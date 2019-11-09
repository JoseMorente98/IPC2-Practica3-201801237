import bodyParser = require('body-parser');
import Server from "./server/server";
import MySQL from './mysql/mysql';
import usuario from "./router/usuario.router";
import mensaje from "./router/mensaje.router";

const server = Server.init(3000);
const api:string = "/api/"

MySQL.getInstance();

/**
  * CORS ACCESS
  */
server.app.use((req:any, res:any, next:any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if(req.methods == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

/**
 * BODY PARSER
 */
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({ extended: false }));

/**
 * ROUTER
 */
server.app.use(api, usuario);
server.app.use(api, mensaje);

server.start(()=> {
  console.log("Servidor corriendo en el puerto 3000 :D")
});