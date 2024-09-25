import express, { Request, Response, Router } from 'express'

import { User } from '../models/users.js'
import { getAllUser, insertUser, deleteUser } from '../database/users.js'
import { WithId } from 'mongodb'

export const router: Router = express.Router()

router.get('/', async (req: Request, res: Response<WithId<User>[]>) => {
  const allUser: WithId<User>[] = await getAllUser()
  res.send(allUser)
})


//POST

router.post('/', async (req: Request, res: Response) => {
  try {
    const user: User = req.body
    const insertedId = await insertUser(user)

    if (insertedId) {
      res.status(201).send('User added succesfully')
    } else {
      res.status(400).send('Failed to add your user')
    }
  } catch (error: any) {
    res.status(500).send('An error occured' + error.message)
  }
})

//DELETE

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const wasDeleted = await deleteUser(userId)

    if (wasDeleted) {
      res.status(200).send('User deleted successfully')
    } else {
      res.status(404).send('User not found')
    }
  } catch (error: any) {
    res.status(500).send('An error occurred: ' + error.message)
  }
})