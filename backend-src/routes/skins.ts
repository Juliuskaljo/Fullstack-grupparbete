import express, { Request, Response, Router } from 'express'

import { Skin } from '../models/skin.js'
import { getAllSkins, insertSkin } from '../database/skins.js'
import { WithId } from 'mongodb'

export const router: Router = express.Router()

//GET
router.get('/', async (req: Request, res: Response<WithId<Skin>[]>) => {
  const allSkins: WithId<Skin>[] = await getAllSkins()
  res.send(allSkins)
})

//POST
router.post('/', async (req: Request, res: Response) => {
  try {
    const skin: Skin = req.body
    const insertedId = await insertSkin(skin)

    if (insertedId) {
      res.status(201).send('Skin added succesfully')
    } else {
      res.status(400).send('Failed to add your skin')
    }
  } catch (error: any) {
    res.status(500).send('An error occured' + error.message)
  }
})
