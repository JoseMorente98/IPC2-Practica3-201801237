import { Request, Response } from 'express';
import MySQL from "./../mysql/mysql";

export default class UsuarioController {
    private static _instance: UsuarioController;

    constructor() {
    }

    public static getInstance() {
        return this._instance || ( this._instance = new this() );
    }

    getAll = (req: Request, res: Response) => {
        const query = `
            SELECT idUsuario, nombre, apellido, username, conexion, idTipoUsuario
            FROM Usuario
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
            SELECT *
            FROM Usuario WHERE idUsuario = ?;
        `;

        let body = {
            idUsuario : req.params.id
        }

        MySQL.sendQuery(query, body.idUsuario, (err:any, data:Object[]) => {
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

    create = (req: Request, res: Response) => {
        const query = `
            INSERT INTO Usuario(username, password, nombre, apellido, idTipoUsuario) 
            VALUES (?, ?, ?, ?, ?);
        `;

        let body = {
            username: req.body.username,
            password: req.body.password,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            idTipoUsuario: req.body.idTipoUsuario,
        }
        
        MySQL.sendQuery(query, 
            [body.username, body.password, body.nombre, body.apellido, body.idTipoUsuario], 
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
            UPDATE Usuario SET password = ?, nombre = ?, apellido = ?, idTipoUsuario = ?
            WHERE idUsuario = ?;
        `;

        let body = {
            idUsuario: req.params.id,
            password: req.body.password,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            idTipoUsuario: req.body.idTipoUsuario,
        }
        
        MySQL.sendQuery(query, 
            [body.password, body.nombre, body.apellido, body.idTipoUsuario, body.idUsuario], 
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


    auth = (req: Request, res: Response) => {
        const query = `
            CALL SP_Autenticar(?, ?);
        `;

        let body = {
            username: req.body.username,
            password: req.body.password
        }
        
        MySQL.sendQuery(query, 
            [body.username, body.password, ], 
            (err:any, data:Object[]) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    status: 400,
                    error: err
                });
            } else {
                console.log(data[0])
                res.json(data[0])
            }
        })
    }

    delete = (req: Request, res: Response) => {
        const id = req.params.id;

        const query = `
            DELETE FROM Usuario WHERE idUsuario = ?;
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