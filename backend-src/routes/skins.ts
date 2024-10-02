import express, { Request, Response, Router } from 'express'
import { Collection } from 'mongodb'
import { Skin } from '../models/skin.js'
import {
  getAllSkins,
  insertSkin,
  deleteSkin,
  updateSkin,
  getSpecificSkin,
} from '../database/skins.js'
import { isValidSkin } from '../models/validation.js'
import { WithId } from 'mongodb'

let col: Collection<Skin>

export const router: Router = express.Router()

//GET
router.get('/', async (req: Request, res: Response<WithId<Skin>[]>) => {
  const allSkins: WithId<Skin>[] = await getAllSkins()
  res.send(allSkins)
})

router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query
    if (!q || typeof q !== 'string') {
      return res.status(400).send('Invalid querry parameter')
    }

    const specificSkin: WithId<Skin>[] = await getSpecificSkin(q)
    if (specificSkin) {
      return res.status(200).send(specificSkin)
    } else {
      return res.status(400).send('Skin not found')
    }
  } catch (error: any) {
    return res.status(500).send('Server error' + error.message)
  }
})

//POST
router.post('/', async (req: Request, res: Response) => {
  try {
    const skin: Skin = req.body
    if (!isValidSkin(skin)) {
      res.status(400).send('You entered wrong data format')
      return
    }
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

// DELETEE

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const skinId = req.params.id
    const wasDeleted = await deleteSkin(skinId)

    if (wasDeleted) {
      res.status(200).send('Skin deleted successfully')
    } else {
      res.status(404).send('Skin not found')
    }
  } catch (error: any) {
    res.status(500).send('An error occurred: ' + error.message)
  }
})

//PUT

router.put('/:id', async (req: Request, res: Response) => {
  const skindId = req.params.id
  const updatedSkin: Partial<Skin> = req.body
  const wasUpdated = await updateSkin(skindId, updatedSkin)

  if (wasUpdated) {
    res.status(200).send('Skin updated successfully')
  } else {
    res.status(400).send('Failed to update skin')
  }
})
