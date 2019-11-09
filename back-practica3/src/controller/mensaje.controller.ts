import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class MensajeController {
    private static _instance: MensajeController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Mensaje
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getAllDelete = (req: Request, res: Response) => {
        const query = `
            SELECT idUsuario1, idUsuario2, estado, leido, cuerpo, concat_ws(' ', Us.nombre, Us.apellido) as 'Emisor',
            concat_ws(' ', Us2.nombre, Us2.apellido) as 'Receptor'  FROM Mensaje
            INNER JOIN Usuario Us ON Mensaje.idUsuario1 = Us.idUsuario
            INNER JOIN Usuario Us2 ON Mensaje.idUsuario2 = Us2.idUsuario
            WHERE estado = 1;
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getTop5Envia = (req: Request, res: Response) => {
        const query = `
            SELECT count(*) as 'enviados', Usuario.nombre, Usuario.apellido FROM Mensaje
            INNER JOIN Usuario ON Mensaje.idUsuario1 = Usuario.idUsuario
            GROUP BY idUsuario1
            ORDER BY enviados DESC
            LIMIT 5;
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getConversaciones = (req: Request, res: Response) => {
        const query = `
            SELECT Usuario.nombre, Usuario.apellido, COUNT(*) as 'cantidad' FROM (SELECT * FROM Mensaje
            GROUP BY idUsuario1, idUsuario2) AS Conversacion
            INNER JOIN Usuario ON Conversacion.idUsuario1 = Usuario.idUsuario
            GROUP BY idUsuario1
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getTop5Recibe = (req: Request, res: Response) => {
        const query = `
            SELECT count(*) as 'enviados', Usuario.nombre, Usuario.apellido FROM Mensaje
            INNER JOIN Usuario ON Mensaje.idUsuario2 = Usuario.idUsuario
            GROUP BY idUsuario2
            ORDER BY enviados DESC
            LIMIT 5;
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getChats = (req: Request, res: Response) => {
        const query = `
            SELECT idUsuario1, idUsuario2, concat_ws(' ', Us.nombre, Us.apellido) as 'Emisor', concat_ws(' ', Us2.nombre, Us2.apellido) as 'Receptor'  FROM Mensaje
            INNER JOIN Usuario Us ON Mensaje.idUsuario1 = Us.idUsuario
            INNER JOIN Usuario Us2 ON Mensaje.idUsuario2 = Us2.idUsuario
            GROUP BY idUsuario1, idUsuario2;
        `;

        MySQL.getQuery(query, (err:any, data:Object[]) => {
            if(err) {
                res.json([]);
            } else {
                res.json(data)
            }
        })
    }

    getSingle = (req: Request, res: Response) => {
        const query = `
            SELECT * FROM Mensaje WHERE idMensaje = ?
        `;

        let body = {
            idMensaje : req.params.id
        }

        MySQL.sendQuery(query, body.idMensaje, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json(data[0])
            }
        })
    }

    getMessageUser = (req: Request, res: Response) => {
        const query = `
            SELECT Usuario.nombre, Usuario.apellido, Usuario.username,Usuario.conexion, Usuario.idUsuario as 'Receptor' FROM Mensaje
            INNER JOIN Usuario ON Mensaje.idUsuario2 = Usuario.idUsuario
            WHERE idUsuario1 = ?
            UNION
            SELECT Usuario.nombre, Usuario.apellido, Usuario.username, Usuario.conexion, Usuario.idUsuario as 'Receptor' FROM Mensaje
            INNER JOIN Usuario ON Mensaje.idUsuario1 = Usuario.idUsuario
            WHERE idUsuario2 = ?
            ORDER BY Receptor;
        `;

        let body = {
            idUsuario : req.params.id
        }

        MySQL.sendQuery(query, [body.idUsuario, body.idUsuario], (err:any, data:Object[]) => {
            if(err) {
                res.json([])
            } else {
                res.json(data)
            }
        })
    }

    getMessages = (req: Request, res: Response) => {
        const query = `
        SELECT idMensaje, idUsuario1, idUsuario2, cuerpo, fecha, leido, fechaLeido, estado FROM Mensaje
            WHERE idUsuario1 = ? AND idUsuario2 = ?
            UNION 
        SELECT idMensaje, idUsuario1, idUsuario2, cuerpo, fecha, leido, fechaLeido, estado FROM Mensaje
            WHERE idUsuario1 = ? AND idUsuario2 = ?
            ORDER BY idMensaje;
        `;

        let body = {
            idUsuario1 : req.params.id,
            idUsuario2 : req.params.id2,
        }

        MySQL.sendQuery(query, [body.idUsuario1, body.idUsuario2, body.idUsuario2, body.idUsuario1], (err:any, data:Object[]) => {
            if(err) {
                res.json([])
            } else {
                res.json(data)
            }
        })
    }

    create = (req: Request, res: Response) => {
        const query = `
            INSERT INTO Mensaje(idUsuario1, idUsuario2, cuerpo)
            VALUES(?, ?, ?);
        `;

        let body = {
            idUsuario1: req.body.idUsuario1,
            idUsuario2: req.body.idUsuario2,
            cuerpo: req.body.cuerpo
        }
        
        MySQL.sendQuery(query, 
            [body.idUsuario1, body.idUsuario2, body.cuerpo], 
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200
                })
            }
        })
    }

    update = (req: Request, res: Response) => {
        const query = `
            UPDATE Mensaje SET leido = ?, fechaLeido = NOW() WHERE idMensaje = ?;
        `;

        let body = {
            idMensaje: req.params.id,
            leido: req.body.leido
        }
        
        MySQL.sendQuery(query, 
            [body.leido, body.idMensaje], 
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200
                })
            }
        })
    }

    delete = (req: Request, res: Response) => {
        const id = req.params.id;

        const query = `
            UPDATE Mensaje SET estado = 1 WHERE idMensaje = ?;
        `;

        MySQL.sendQuery(query, id, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                })
            }
        })
    }

    deleteChat = (req: Request, res: Response) => {
        const id = req.params.id;

        const query = `
            DELETE FROM Mensaje WHERE idUsuario2 = ?;
        `;

        MySQL.sendQuery(query, id, (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                })
            }
        })
    }
}