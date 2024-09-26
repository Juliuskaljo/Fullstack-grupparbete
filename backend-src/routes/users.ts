import express, { Request, Response, Router } from 'express'

import { User } from '../models/users.js'
import {
  getAllUser,
  insertUser,
  deleteUser,
  updateUser,
  getSpecificUser,
} from '../database/users.js'
import { WithId } from 'mongodb'

export const router: Router = express.Router()

router.get('/', async (req: Request, res: Response<WithId<User>[]>) => {
  const allUser: WithId<User>[] = await getAllUser()
  res.send(allUser)
})

router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query
    if (!q || typeof q !== 'string') {
      return res.status(400).send('Invalid querry parameter')
    }

    const specificUser: WithId<User>[] = await getSpecificUser(q)
    if (specificUser) {
      return res.status(200).send(specificUser)
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

//PUT

router.put('/:id', async (req: Request, res: Response) => {
  const userId = req.params.id
  const updatedUser: Partial<User> = req.body
  const wasUpdated = await updateUser(userId, updatedUser)
  if (wasUpdated) {
    res.status(200).send('User updated successfully')
  } else {
    res.status(400).send('Failed to update user')
  }
})
