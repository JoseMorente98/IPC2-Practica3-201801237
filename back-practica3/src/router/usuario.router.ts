import { Router } from "express";
import UsuarioController from "./../controller/usuario.controller"
const usuario = Router();

usuario.post('/auth', UsuarioController.getInstance().auth);
usuario.get('/usuario', UsuarioController.getInstance().getAll);
usuario.get('/usuario/:id', UsuarioController.getInstance().getSingle);
usuario.delete('/usuario/:id', UsuarioController.getInstance().delete);
usuario.put('/usuario/:id', UsuarioController.getInstance().update);
usuario.post('/usuario', UsuarioController.getInstance().create);

export default usuario;