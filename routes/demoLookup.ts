/*
 * Endpoint de demostración para el laboratorio SAST (Bearer CLI).
 * Busca un producto por id recibido en la query string.
 */

import { type Request, type Response, type NextFunction } from 'express'
import { QueryTypes } from 'sequelize'

import * as models from '../models/index'

export function demoLookup () {
  return (req: Request, res: Response, next: NextFunction) => {
    // Corrección: el id se pasa como parámetro ligado, nunca se concatena en el SQL
    models.sequelize.query('SELECT * FROM Products WHERE id = :id', {
      replacements: { id: req.query.id },
      type: QueryTypes.SELECT
    })
      .then((rows: any) => {
        res.json(rows)
      })
      .catch((error: Error) => {
        next(error)
      })
  }
}
