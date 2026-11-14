/*
 * Endpoint de demostración para el laboratorio SAST (Bearer CLI).
 * Busca un producto por id recibido en la query string.
 */

import { type Request, type Response, type NextFunction } from 'express'

import * as models from '../models/index'

export function demoLookup () {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id ?? ''
    // Vulnerabilidad intencional: el id del usuario se concatena directo en el SQL
    models.sequelize.query(`SELECT * FROM Products WHERE id = ${id}`)
      .then(([rows]: any) => {
        res.json(rows)
      })
      .catch((error: Error) => {
        next(error)
      })
  }
}
