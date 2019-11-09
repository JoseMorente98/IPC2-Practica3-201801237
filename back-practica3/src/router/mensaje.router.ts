import { Router } from "express";
import UsuarioController from "./../controller/mensaje.controller"
const mensaje = Router();

mensaje.get('/mensaje', UsuarioController.getInstance().getAll);
mensaje.get('/mensaje/delete', UsuarioController.getInstance().getAllDelete);
mensaje.get('/mensaje/envia', UsuarioController.getInstance().getTop5Envia);
mensaje.get('/mensaje/recibe', UsuarioController.getInstance().getTop5Recibe);
mensaje.get('/mensaje/conversacion', UsuarioController.getInstance().getConversaciones);
mensaje.get('/mensaje/chat', UsuarioController.getInstance().getChats);
mensaje.get('/mensaje/:id', UsuarioController.getInstance().getSingle);
mensaje.get('/mensaje/user/:id', UsuarioController.getInstance().getMessageUser);
mensaje.get('/mensaje/:id/:id2', UsuarioController.getInstance().getMessages);
mensaje.post('/mensaje', UsuarioController.getInstance().create);
mensaje.put('/mensaje/:id', UsuarioController.getInstance().update);
mensaje.delete('/mensaje/:id', UsuarioController.getInstance().delete);
mensaje.delete('/chat/:id', UsuarioController.getInstance().deleteChat);

export default mensaje;