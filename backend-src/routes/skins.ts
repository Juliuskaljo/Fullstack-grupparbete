import express, { Request, Response, Router } from 'express'

import { Skin } from '../models/skin.js'
import { getAllSkins } from '../database/skins.js'
import { WithId } from 'mongodb'

export const router: Router = express.Router()

//GET
router.get('/', async (req: Request, res: Response<WithId<Skin>[]>) => {
  const allSkins: WithId<Skin>[] = await getAllSkins()
  res.send(allSkins)
  res.sendStatus(200)
})

//POST
// router.post('/', async (req: Request<Skin>, res: Response) => {

// })
