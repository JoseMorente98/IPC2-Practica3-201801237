-- USE DATABASE
USE Practica3;

-- INSERTAR TIPOS DE USUARIO
INSERT INTO TipoUsuario(nombre, descripcion) VALUES ('Administrador', 'Administrador de la pagina web.');
INSERT INTO TipoUsuario(nombre, descripcion) VALUES ('Usuario', 'Usuario final de la pagina web.');

-- INSERTAR USUARIOS
INSERT INTO Usuario(username, password, nombre, apellido, idTipoUsuario) VALUES ("admin", "12345", "Administrador", "Angular", 1);
INSERT INTO Usuario(username, password, nombre, apellido, idTipoUsuario) VALUES ("admin2", "12345", "Administrador", "Node", 1);
INSERT INTO Usuario(username, password, nombre, apellido, idTipoUsuario) VALUES ("usuario1", "12345", "José", "Morente", 2);
INSERT INTO Usuario(username, password, nombre, apellido, idTipoUsuario) VALUES ("usuario2", "12345", "Rafael", "González", 2);