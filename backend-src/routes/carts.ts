import express, { Request, Response, Router } from 'express'

import { Cart } from '../models/carts.js'
import { getAllCart } from '../database/cart.js'
import { WithId } from 'mongodb'

export const router: Router = express.Router()

router.get('/', async (req: Request, res: Response<WithId<Cart>[]>) => {
  const allCarts: WithId<Cart>[] = await getAllCart()
  res.send(allCarts)
})
