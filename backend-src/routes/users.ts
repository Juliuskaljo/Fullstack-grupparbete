import express, { Request, Response, Router } from 'express'

import { User } from '../models/users.js'
import { getAllUser } from '../database/users.js'
import { WithId } from 'mongodb'

export const router: Router = express.Router()

router.get('/', async (req: Request, res: Response<WithId<User>[]>) => {
  const allUser: WithId<User>[] = await getAllUser()
  res.send(allUser)
})
