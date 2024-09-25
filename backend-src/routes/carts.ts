import express, { Request, Response, Router } from 'express'

import { Cart } from '../models/carts.js'
import { getAllCart, insertCart, deleteCart } from '../database/cart.js'
import { WithId } from 'mongodb'

export const router: Router = express.Router()

router.get('/', async (req: Request, res: Response<WithId<Cart>[]>) => {
  const allCarts: WithId<Cart>[] = await getAllCart()
  res.send(allCarts)
})

//POST

router.post('/', async (req: Request, res: Response) => {
  try {
    const cart: Cart = req.body
    const insertedId = await insertCart(cart)

    if (insertedId) {
      res.status(201).send('Cart added succesfully')
    } else {
      res.status(400).send('Failed to add your cart')
    }
  } catch (error: any) {
    res.status(500).send('An error occured' + error.message)
  }
})

//DELETE

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const cartId = req.params.id
    const wasDeleted = await deleteCart(cartId)

    if (wasDeleted) {
      res.status(200).send('Cart deleted successfully')
    } else {
      res.status(404).send('Cart not found')
    }
  } catch (error: any) {
    res.status(500).send('An error occurred: ' + error.message)
  }
})