"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./../mysql/mysql"));
var MensajeController = /** @class */ (function () {
    function MensajeController() {
        this.getAll = function (req, res) {
            var query = "\n            SELECT * FROM Mensaje\n        ";
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    res.json([]);
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getAllDelete = function (req, res) {
            var query = "\n            SELECT idUsuario1, idUsuario2, estado, leido, cuerpo, concat_ws(' ', Us.nombre, Us.apellido) as 'Emisor',\n            concat_ws(' ', Us2.nombre, Us2.apellido) as 'Receptor'  FROM Mensaje\n            INNER JOIN Usuario Us ON Mensaje.idUsuario1 = Us.idUsuario\n            INNER JOIN Usuario Us2 ON Mensaje.idUsuario2 = Us2.idUsuario\n            WHERE estado = 1;\n        ";
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    res.json([]);
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getTop5Envia = function (req, res) {
            var query = "\n            SELECT count(*) as 'enviados', Usuario.nombre, Usuario.apellido FROM Mensaje\n            INNER JOIN Usuario ON Mensaje.idUsuario1 = Usuario.idUsuario\n            GROUP BY idUsuario1\n            ORDER BY enviados DESC\n            LIMIT 5;\n        ";
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    res.json([]);
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getConversaciones = function (req, res) {
            var query = "\n            SELECT Usuario.nombre, Usuario.apellido, COUNT(*) as 'cantidad' FROM (SELECT * FROM Mensaje\n            GROUP BY idUsuario1, idUsuario2) AS Conversacion\n            INNER JOIN Usuario ON Conversacion.idUsuario1 = Usuario.idUsuario\n            GROUP BY idUsuario1\n        ";
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    res.json([]);
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getTop5Recibe = function (req, res) {
            var query = "\n            SELECT count(*) as 'enviados', Usuario.nombre, Usuario.apellido FROM Mensaje\n            INNER JOIN Usuario ON Mensaje.idUsuario2 = Usuario.idUsuario\n            GROUP BY idUsuario2\n            ORDER BY enviados DESC\n            LIMIT 5;\n        ";
            mysql_1.default.getQuery(query, function (err, data) {
                if (err) {
                    res.json([]);
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getChats = function (req, res) {
            var query = "\n            SELECT idUsuario1, idUsuario2, concat_ws(' ', Us.nombre, Us.apellido) as 'Emisor', concat_ws(' ', Us2.nombre, Us2.apellido) as 'Receptor'  FROM Mensaje\n            INNER JOIN Usuario Us ON Mensaje.idUsuario1 = Us.idUsuario\n            INNER JOIN Usuario Us2 ON Mensaje.idUsuario2 = Us2.idUsuario\n            GROUP BY idUsuario1, idUsuario2;\n        ";
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
            var query = "\n            SELECT * FROM Mensaje WHERE idMensaje = ?\n        ";
            var body = {
                idMensaje: req.params.id
            };
            mysql_1.default.sendQuery(query, body.idMensaje, function (err, data) {
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
        this.getMessageUser = function (req, res) {
            var query = "\n            SELECT Usuario.nombre, Usuario.apellido, Usuario.username,Usuario.conexion, Usuario.idUsuario as 'Receptor' FROM Mensaje\n            INNER JOIN Usuario ON Mensaje.idUsuario2 = Usuario.idUsuario\n            WHERE idUsuario1 = ?\n            UNION\n            SELECT Usuario.nombre, Usuario.apellido, Usuario.username, Usuario.conexion, Usuario.idUsuario as 'Receptor' FROM Mensaje\n            INNER JOIN Usuario ON Mensaje.idUsuario1 = Usuario.idUsuario\n            WHERE idUsuario2 = ?\n            ORDER BY Receptor;\n        ";
            var body = {
                idUsuario: req.params.id
            };
            mysql_1.default.sendQuery(query, [body.idUsuario, body.idUsuario], function (err, data) {
                if (err) {
                    res.json([]);
                }
                else {
                    res.json(data);
                }
            });
        };
        this.getMessages = function (req, res) {
            var query = "\n        SELECT idMensaje, idUsuario1, idUsuario2, cuerpo, fecha, leido, fechaLeido, estado FROM Mensaje\n            WHERE idUsuario1 = ? AND idUsuario2 = ?\n            UNION \n        SELECT idMensaje, idUsuario1, idUsuario2, cuerpo, fecha, leido, fechaLeido, estado FROM Mensaje\n            WHERE idUsuario1 = ? AND idUsuario2 = ?\n            ORDER BY idMensaje;\n        ";
            var body = {
                idUsuario1: req.params.id,
                idUsuario2: req.params.id2,
            };
            mysql_1.default.sendQuery(query, [body.idUsuario1, body.idUsuario2, body.idUsuario2, body.idUsuario1], function (err, data) {
                if (err) {
                    res.json([]);
                }
                else {
                    res.json(data);
                }
            });
        };
        this.create = function (req, res) {
            var query = "\n            INSERT INTO Mensaje(idUsuario1, idUsuario2, cuerpo)\n            VALUES(?, ?, ?);\n        ";
            var body = {
                idUsuario1: req.body.idUsuario1,
                idUsuario2: req.body.idUsuario2,
                cuerpo: req.body.cuerpo
            };
            mysql_1.default.sendQuery(query, [body.idUsuario1, body.idUsuario2, body.cuerpo], function (err, data) {
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
            var query = "\n            UPDATE Mensaje SET leido = ?, fechaLeido = NOW() WHERE idMensaje = ?;\n        ";
            var body = {
                idMensaje: req.params.id,
                leido: req.body.leido
            };
            mysql_1.default.sendQuery(query, [body.leido, body.idMensaje], function (err, data) {
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
        this.delete = function (req, res) {
            var id = req.params.id;
            var query = "\n            UPDATE Mensaje SET estado = 1 WHERE idMensaje = ?;\n        ";
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
        this.deleteChat = function (req, res) {
            var id = req.params.id;
            var query = "\n            DELETE FROM Mensaje WHERE idUsuario2 = ?;\n        ";
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
    MensajeController.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return MensajeController;
}());
exports.default = MensajeController;
