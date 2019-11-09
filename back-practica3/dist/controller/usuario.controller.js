"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var UsuarioController = /** @class */ (function () {
    function UsuarioController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT idUsuario, nombre, apellido, username, conexion, idTipoUsuario\n            FROM Usuario\n        ";
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    res.json([]);
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getSingle = function (req, res) {
            var query = "\n            SELECT *\n            FROM Usuario WHERE idUsuario = ?;\n        ";
            var body = {
                idUsuario: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idUsuario, function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json(data[0]);
                }
            });
        };
        this.create = function (req, res) {
            var query = "\n            INSERT INTO Usuario(username, password, nombre, apellido, idTipoUsuario) \n            VALUES (?, ?, ?, ?, ?);\n        ";
            var body = {
                username: req.body.username,
                password: req.body.password,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                idTipoUsuario: req.body.idTipoUsuario,
            };
            mysql_1.default.sendQuery(query, [body.username, body.password, body.nombre, body.apellido, body.idTipoUsuario], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200
                    });
                }
            });
        };
        this.update = function (req, res) {
            var query = "\n            UPDATE Usuario SET password = ?, nombre = ?, apellido = ?, idTipoUsuario = ?\n            WHERE idUsuario = ?;\n        ";
            var body = {
                idUsuario: req.params.id,
                password: req.body.password,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                idTipoUsuario: req.body.idTipoUsuario,
            };
            mysql_1.default.sendQuery(query, [body.password, body.nombre, body.apellido, body.idTipoUsuario, body.idUsuario], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200
                    });
                }
            });
        };
        this.auth = function (req, res) {
            var query = "\n            CALL SP_Autenticar(?, ?);\n        ";
            var body = {
                username: req.body.username,
                password: req.body.password
            };
            mysql_1.default.sendQuery(query, [body.username, body.password,], function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    console.log(data[0]);
                    res.json(data[0]);
                }
            });
        };
        this.delete = function (req, res) {
            var id = req.params.id;
            var query = "\n            DELETE FROM Usuario WHERE idUsuario = ?;\n        ";
            mysql_1.default.sendQuery(query, id, function (err, data) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        status: 400,
                        error: err
                    });
                }
                else {
                    res.json({
                        ok: true,
                        status: 200,
                    });
                }
            });
        };
    }
    UsuarioController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return UsuarioController;
}());
exports.default = UsuarioController;
