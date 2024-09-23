import express, { Request, Response, Router} from 'express'

import { Skin } from '../models/skin.js'
import { getAllSkins } from '../database/skins.js'
import { WithId } from 'mongodb'

export const router: Router = express.Router()

router.get('/', async ( req: Request, res: Response<WithId<Skin>[]>) => {
	const allSkins: WithId<Skin>[] = await getAllSkins()
	res.send(allSkins)
})