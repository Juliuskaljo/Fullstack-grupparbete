import express, { Request, Response, Router } from 'express'
import { Collection } from 'mongodb'
import { Skin } from '../models/skin.js'
import { getAllSkins, insertSkin, deleteSkin } from '../database/skins.js'
import { WithId } from 'mongodb'

let col: Collection<Skin>;

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