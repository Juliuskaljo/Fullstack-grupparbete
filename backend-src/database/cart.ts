import { MongoClient, Db, Collection, WithId } from 'mongodb'
import { Cart } from '../models/carts.js'
import { connectToDatabase } from './db.js'

async function getAllCart(): Promise<WithId<Cart>[]> {
  const db: Db = await connectToDatabase()
  const col: Collection<Cart> = db.collection<Cart>('cart')

  const result: WithId<Cart>[] = await col.find({}).toArray()
  return result
}

export { getAllCart }
